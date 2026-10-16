// src/pages/RegisterPage.tsx
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerSchema } from "../schemas/authSchema";
import type { RegisterFormValues } from "../schemas/authSchema";
import { registerCustomer, loginCustomer } from "../api/client";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function RegisterPage() {
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", password: "" },
  });

  // Named signUp, not register, because useForm already gave us a register.
  const signUp = useMutation({
    // Registering does not log you in. So create the account, then log in
    // with the same email and password, in one mutation.
    mutationFn: async (values: RegisterFormValues) => {
      await registerCustomer(values);
      return loginCustomer({ email: values.email, password: values.password });
    },
    onSuccess: (reply) => {
      setSession(reply.token, reply.customer.name);
      navigate("/orders");
    },
  });

  const onSubmit = (values: RegisterFormValues): void => {
    signUp.mutate(values);
  };

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name")}
            aria-invalid={errors.name ? true : undefined}
            placeholder="Juan dela Cruz"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={errors.email ? true : undefined}
            placeholder="juan@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            aria-invalid={errors.password ? true : undefined}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" disabled={signUp.isPending} className="justify-self-start">
          {signUp.isPending ? "Creating account..." : "Create account"}
        </Button>

        {/* e.g. the backend's 409: "That email is already registered" */}
        {signUp.isError && (
          <p className="text-sm text-red-700">{signUp.error.message}</p>
        )}
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
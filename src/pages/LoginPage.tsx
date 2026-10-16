// src/pages/LoginPage.tsx
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "../schemas/authSchema";
import type { LoginFormValues } from "../schemas/authSchema";
import { loginCustomer } from "../api/client";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  // A login is a write to the server, so it is a mutation, like adding a pre-order.
  const login = useMutation({
    mutationFn: loginCustomer,
    onSuccess: (reply) => {
      // The token comes from the backend now, not from the front end.
      setSession(reply.token, reply.customer.name);
      navigate("/orders");
    },
  });

  // Only called after the schema passes.
  const onSubmit = (values: LoginFormValues): void => {
    login.mutate(values);
  };

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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

        <Button type="submit" disabled={login.isPending} className="justify-self-start">
          {login.isPending ? "Logging in..." : "Log In"}
        </Button>

        {/* The backend's own message: "Email or password is incorrect" */}
        {login.isError && (
          <p className="text-sm text-red-700">{login.error.message}</p>
        )}
      </form>

      <p className="mt-4 text-sm">
        No account yet?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
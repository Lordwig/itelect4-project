import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { assistantFormSchema } from "../schemas/assistantSchema";
import type { AssistantFormValues } from "../schemas/assistantSchema";
import type { AiSuggestion } from "../types/index";
import { askAi } from "../api/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Record<..., string> makes TypeScript check the table is COMPLETE: add a
// fourth match value to AiSuggestion and these two stop compiling until
// every value has a colour and a label.
const MATCH_STYLE: Record<AiSuggestion["match"], string> = {
  good: "bg-green-100 text-green-800",
  partial: "bg-yellow-100 text-yellow-800",
  none: "bg-red-100 text-red-800",
};

const MATCH_LABEL: Record<AiSuggestion["match"], string> = {
  good: "Good match",
  partial: "Partial match",
  none: "Not on the menu",
};

function AssistantPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssistantFormValues>({
    resolver: zodResolver(assistantFormSchema),
    mode: "onBlur",
    defaultValues: { prompt: "" },
  });

  // Asking the AI is a write to the server -- it POSTs and costs quota -- so
  // it is a mutation, not a query. A query would fire again on every window
  // focus and spend a request each time.
  const suggest = useMutation({ mutationFn: askAi });

  // Only called after the schema passes.
  const onSubmit = (values: AssistantFormValues): void => {
    suggest.mutate(values.prompt);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="mb-1 text-2xl font-bold">Order Helper</h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Tell us what you feel like and we will suggest what to pre-order from
        the menu.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="prompt">What are you in the mood for?</Label>
          <textarea
            id="prompt"
            rows={5}
            {...register("prompt")}
            aria-invalid={errors.prompt ? true : undefined}
            placeholder="e.g. Something cold to drink and a pastry, and I want to spend less than 250 pesos in total."
            className="w-full rounded-lg border border-input bg-background p-2.5 text-sm text-foreground aria-invalid:border-red-500"
          />
          {errors.prompt && (
            <p className="text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={suggest.isPending}
          className="justify-self-start"
        >
          {suggest.isPending ? "Thinking..." : "Suggest an order"}
        </Button>

        {/* The backend's own sentence: rate limited, quota used up, or the
            AI service did not answer properly. */}
        {suggest.isError && (
          <p className="text-sm text-red-700">{suggest.error.message}</p>
        )}
      </form>

      {/* Every field of the reply is shown: summary, picks and match. */}
      {suggest.data && (
        <section className="mt-6 grid gap-4 rounded-lg border border-border p-4">
          <span
            className={`w-fit rounded px-2 py-1 text-sm font-semibold ${MATCH_STYLE[suggest.data.match]}`}
          >
            {MATCH_LABEL[suggest.data.match]}
          </span>

          <p>{suggest.data.summary}</p>

          <div>
            <h3 className="mb-1 font-semibold">Suggested for you</h3>
            <ul className="list-disc pl-5">
              {suggest.data.picks.map((pick) => (
                <li key={pick}>{pick}</li>
              ))}
            </ul>
          </div>

          <p className="text-sm">
            Ready to order?{" "}
            <Link to="/orders" className="text-blue-600 underline">
              Go to My Orders
            </Link>
          </p>
        </section>
      )}
    </div>
  );
}

export default AssistantPage;
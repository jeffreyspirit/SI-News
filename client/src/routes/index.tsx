import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  return (
    <section>
      <h1>NEWS</h1>
    </section>
  );
}

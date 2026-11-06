import { EmptyState } from "@/components";

export default function CreateProjectPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Create a project
      </h1>
      <EmptyState
        title="Coming soon"
        description="Project creation is not available yet."
      />
    </main>
  );
}

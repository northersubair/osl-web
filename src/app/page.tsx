import { ProjectHeader } from "@/components/ProjectHeader";
import { sampleProject, SAMPLE_PROJECT_LABEL } from "@/fixtures/sample-project";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">
        Open Support Ledger
      </h1>
      <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        Transparent funding pages and public payment ledgers for open-source
        projects, powered by Stellar.
      </p>

      {/* Temporary preview of ProjectHeader on sample data. */}
      <section
        aria-labelledby="sample-preview"
        className="mt-6 flex w-full max-w-2xl flex-col gap-2 text-left"
      >
        <h2 id="sample-preview" className="text-sm font-semibold uppercase">
          Preview: {SAMPLE_PROJECT_LABEL}
        </h2>
        <ProjectHeader {...sampleProject} headingLevel={2} />
      </section>
    </main>
  );
}

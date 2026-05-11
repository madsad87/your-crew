import { useEffect, useMemo, useState } from "react";
import type {
  AgentBoard,
  AgentBoardTask,
  BoardResponse,
  TaskStatus,
  ValidationResponse,
} from "./types/agentboard";

const workflowColumns: Array<{
  id: TaskStatus;
  label: string;
  hint: string;
  tone: string;
  rail: string;
  badge: string;
}> = [
  {
    id: "inbox",
    label: "Inbox",
    hint: "Captured tasks awaiting triage",
    tone: "border-violet-200 bg-violet-50/55",
    rail: "bg-violet-500",
    badge: "bg-violet-100 text-violet-800",
  },
  {
    id: "ready",
    label: "Ready",
    hint: "Defined work ready to claim",
    tone: "border-sky-200 bg-sky-50/55",
    rail: "bg-sky-500",
    badge: "bg-sky-100 text-sky-800",
  },
  {
    id: "in-progress",
    label: "In Progress",
    hint: "Claimed work currently active",
    tone: "border-blue-200 bg-blue-50/55",
    rail: "bg-blue-600",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    id: "review",
    label: "Review",
    hint: "Completed work awaiting validation",
    tone: "border-amber-200 bg-amber-50/60",
    rail: "bg-amber-500",
    badge: "bg-amber-100 text-amber-900",
  },
  {
    id: "done",
    label: "Done",
    hint: "Approved and complete tasks",
    tone: "border-green-200 bg-green-50/60",
    rail: "bg-green-600",
    badge: "bg-green-100 text-green-800",
  },
  {
    id: "blocked",
    label: "Blocked",
    hint: "Work waiting on a blocker",
    tone: "border-red-200 bg-red-50/60",
    rail: "bg-red-600",
    badge: "bg-red-100 text-red-800",
  },
];

export function App() {
  const [board, setBoard] = useState<AgentBoard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationResponse | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadBoard() {
      try {
        const response = await fetch("/api/board");
        const payload = (await response.json()) as BoardResponse;

        if (!response.ok || !payload.ok) {
          throw new Error(payload.ok ? "Board request failed." : payload.error.message);
        }

        if (isMounted) {
          setBoard(payload.data);
          setError(null);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load AgentBoard.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadBoard();

    return () => {
      isMounted = false;
    };
  }, []);

  async function runValidation() {
    setIsValidating(true);

    try {
      const response = await fetch("/api/validate");
      const payload = (await response.json()) as ValidationResponse;

      if (!response.ok || ("error" in payload && !("data" in payload))) {
        throw new Error("error" in payload ? payload.error.message : "Validation request failed.");
      }

      setValidation(payload);
      setValidationError(null);
    } catch (runError) {
      setValidationError(runError instanceof Error ? runError.message : "Unable to run validation.");
    } finally {
      setIsValidating(false);
    }
  }

  useEffect(() => {
    void runValidation();
  }, []);

  const doneIds = useMemo(() => {
    return new Set(board?.columns.done.map((task) => task.id) ?? []);
  }, [board]);

  const totalTasks = board?.tasks.length ?? 0;
  const activeTasks =
    (board?.columns.ready.length ?? 0) +
    (board?.columns["in-progress"].length ?? 0) +
    (board?.columns.review.length ?? 0);
  const selectedTask = board?.tasks.find((task) => task.id === selectedTaskId) ?? null;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
                Your Crew
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-stone-950">
                AgentBoard Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                A local Kanban view for Markdown task files moving through the AgentBoard workflow.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <StatusStat label="Board files" value={isLoading ? "Loading" : String(totalTasks)} />
              <StatusStat label="Active" value={isLoading ? "Loading" : String(activeTasks)} />
              <StatusStat label="Mode" value="Read-only MVP" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
        <ValidationPanel
          error={validationError}
          isValidating={isValidating}
          onRefresh={() => void runValidation()}
          validation={validation}
        />
        {error ? <ErrorState message={error} /> : null}
        <div className="grid min-w-0 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {workflowColumns.map((column) => (
            <section className={`min-h-80 min-w-0 rounded-lg border shadow-sm ${column.tone}`} key={column.id}>
              <header className="border-b border-stone-200 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold text-stone-900">{column.label}</h2>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${column.badge}`}>
                    {board?.columns[column.id].length ?? 0}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-stone-500">{column.hint}</p>
              </header>
              <div className="flex min-h-56 flex-col gap-3 px-3 py-3">
                {isLoading ? <ColumnLoading /> : null}
                {!isLoading && board?.columns[column.id].length === 0 ? (
                  <ColumnEmpty label={column.label} />
                ) : null}
                {board?.columns[column.id].map((task) => (
                  <TaskCard
                    column={column}
                    doneIds={doneIds}
                    isSelected={task.id === selectedTaskId}
                    key={task.relativePath}
                    onSelect={() => setSelectedTaskId(task.id)}
                    task={task}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      {selectedTask ? (
        <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTaskId(null)} />
      ) : null}
    </main>
  );
}

function StatusStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2">
      <p className="text-xs font-medium text-stone-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-stone-900">{value}</p>
    </div>
  );
}

function ValidationPanel({
  error,
  isValidating,
  onRefresh,
  validation,
}: {
  error: string | null;
  isValidating: boolean;
  onRefresh: () => void;
  validation: ValidationResponse | null;
}) {
  const hasData = validation && "data" in validation;
  const isPassing = Boolean(hasData && validation.ok);
  const issues = hasData ? validation.data.issues : [];
  const checkedTaskCount = hasData ? validation.data.checkedTaskCount : 0;
  const statusClass = isPassing
    ? "border-green-200 bg-green-50 text-green-800"
    : "border-amber-200 bg-amber-50 text-amber-900";
  const statusText = isValidating
    ? "Running validation"
    : isPassing
      ? "Validation passing"
      : "Validation needs attention";

  return (
    <section className={`mb-4 rounded-lg border px-4 py-3 ${statusClass}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold">{statusText}</p>
          <p className="mt-1 text-xs leading-5">
            {hasData
              ? `Checked ${checkedTaskCount} task file${checkedTaskCount === 1 ? "" : "s"}.`
              : "Validation has not completed yet."}
          </p>
          {error ? <p className="mt-2 text-xs font-medium text-red-700">{error}</p> : null}
        </div>
        <button
          className="w-fit rounded-lg border border-current px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isValidating}
          onClick={onRefresh}
          type="button"
        >
          {isValidating ? "Running" : "Refresh"}
        </button>
      </div>

      {issues.length > 0 ? (
        <div className="mt-3 space-y-2">
          {issues.map((issue) => (
            <div className="rounded-md border border-amber-200 bg-white/70 px-3 py-2" key={`${issue.file}:${issue.message}`}>
              <p className="break-all text-xs font-semibold text-stone-700">{issue.file}</p>
              <p className="mt-1 text-xs text-stone-600">{issue.message}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function TaskCard({
  column,
  doneIds,
  isSelected,
  onSelect,
  task,
}: {
  column: (typeof workflowColumns)[number];
  doneIds: Set<string>;
  isSelected: boolean;
  onSelect: () => void;
  task: AgentBoardTask;
}) {
  const dependencyLabel = getDependencyLabel(task, doneIds);
  const objective = task.sections.Objective?.content;

  return (
    <button
      className={`group relative min-w-0 overflow-hidden rounded-lg border bg-white text-left shadow-sm transition-colors hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 ${
        isSelected ? "border-emerald-400" : "border-stone-200"
      }`}
      onClick={onSelect}
      type="button"
    >
      <div className={`absolute inset-y-0 left-0 w-1 ${column.rail}`} />
      <div className="space-y-3 px-4 py-3 pl-5">
        <div className="flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-stone-500">{task.id}</p>
            <h3 className="mt-1 break-words text-sm font-semibold leading-5 text-stone-950">
              {task.title}
            </h3>
          </div>
          <span className="shrink-0 rounded-full bg-stone-100 px-2 py-1 text-xs font-semibold text-stone-700">
            {task.priority || "medium"}
          </span>
        </div>

        {objective ? (
          <p className="line-clamp-3 break-words text-xs leading-5 text-stone-600">{objective}</p>
        ) : null}

        <div className="flex flex-wrap gap-2 text-xs">
          <Pill label={task.assignedAgent || "unassigned"} />
          <Pill label={dependencyLabel} tone={dependencyLabel.includes("blocked") ? "warning" : "neutral"} />
          {!task.statusMatchesFolder ? <Pill label="status mismatch" tone="danger" /> : null}
        </div>

        <p className="truncate text-xs text-stone-400">{task.relativePath}</p>
      </div>
    </button>
  );
}

function Pill({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "warning" | "danger" }) {
  const toneClass =
    tone === "danger"
      ? "bg-red-50 text-red-700 ring-red-200"
      : tone === "warning"
        ? "bg-amber-50 text-amber-800 ring-amber-200"
        : "bg-stone-50 text-stone-600 ring-stone-200";

  return <span className={`rounded-full px-2 py-1 font-medium ring-1 ${toneClass}`}>{label}</span>;
}

function ColumnLoading() {
  return (
    <div className="rounded-lg border border-dashed border-stone-200 bg-white/70 px-4 py-6 text-center text-sm text-stone-500">
      Loading tasks
    </div>
  );
}

function ColumnEmpty({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-stone-200 bg-white/70 px-4 py-6 text-center text-sm text-stone-500">
      No {label.toLowerCase()} tasks
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      {message}
    </div>
  );
}

function getDependencyLabel(task: AgentBoardTask, doneIds: Set<string>) {
  if (task.dependsOn.length === 0) {
    return "no deps";
  }

  const incompleteCount = task.dependsOn.filter((dependency) => !doneIds.has(dependency)).length;

  if (incompleteCount > 0) {
    return `${incompleteCount} blocked dep${incompleteCount === 1 ? "" : "s"}`;
  }

  return `${task.dependsOn.length} dep${task.dependsOn.length === 1 ? "" : "s"} done`;
}

function TaskDetailPanel({ onClose, task }: { onClose: () => void; task: AgentBoardTask }) {
  const sectionsToShow = [
    "Objective",
    "Acceptance Criteria",
    "Context",
    "Agent Instructions",
    "Validation",
    "Completion Notes",
  ];

  return (
    <div className="fixed inset-0 z-20 flex justify-end bg-stone-950/20">
      <button
        aria-label="Close task detail panel"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <aside className="relative flex h-full w-full max-w-2xl flex-col border-l border-stone-200 bg-white shadow-xl">
        <header className="border-b border-stone-200 px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-stone-500">{task.id}</p>
              <h2 className="mt-1 break-words text-xl font-semibold text-stone-950">{task.title}</h2>
              <p className="mt-2 break-all text-xs text-stone-500">{task.relativePath}</p>
            </div>
            <button
              className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-stone-300 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <section className="grid gap-3 sm:grid-cols-2">
            <MetadataItem label="Status" value={`${task.folderStatus} / ${task.status || "missing"}`} />
            <MetadataItem label="Assigned" value={task.assignedAgent || "unassigned"} />
            <MetadataItem label="Priority" value={task.priority || "medium"} />
            <MetadataItem label="Created By" value={task.createdBy || "unknown"} />
            <MetadataItem
              label="Dependencies"
              value={task.dependsOn.length > 0 ? task.dependsOn.join(", ") : "none"}
            />
            <MetadataItem label="Status Match" value={task.statusMatchesFolder ? "yes" : "no"} />
          </section>

          <section className="mt-5 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3">
            <h3 className="text-xs font-semibold uppercase text-stone-500">Frontmatter</h3>
            <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap break-words text-xs leading-5 text-stone-700">
              {JSON.stringify(task.frontmatter, null, 2)}
            </pre>
          </section>

          <div className="mt-5 space-y-4">
            {sectionsToShow.map((sectionTitle) => (
              <TaskSection
                content={task.sections[sectionTitle]?.content}
                key={sectionTitle}
                title={sectionTitle}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2">
      <p className="text-xs font-medium text-stone-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-stone-900">{value}</p>
    </div>
  );
}

function TaskSection({ content, title }: { content: string | undefined; title: string }) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white px-4 py-3">
      <h3 className="text-sm font-semibold text-stone-950">{title}</h3>
      {content ? (
        <pre className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-stone-700">
          {content}
        </pre>
      ) : (
        <p className="mt-3 text-sm text-stone-500">No content recorded.</p>
      )}
    </section>
  );
}

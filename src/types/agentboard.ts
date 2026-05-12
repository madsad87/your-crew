export type TaskStatus = "inbox" | "ready" | "in-progress" | "review" | "done" | "blocked";

export type MarkdownSection = {
  title: string;
  content: string;
};

export type AgentBoardTask = {
  id: string;
  title: string;
  status: string;
  folderStatus: TaskStatus;
  statusMatchesFolder: boolean;
  assignedAgent: string;
  priority: string;
  dependsOn: string[];
  skills: string[];
  expectedFiles: string[];
  parallelSafe: boolean | null;
  artifacts: string[];
  createdBy: string;
  filePath: string;
  relativePath: string;
  frontmatter: Record<string, unknown>;
  body: string;
  sections: Record<string, MarkdownSection>;
};

export type SkillRegistryEntry = {
  name: string;
  purpose: string;
  status: string;
  appliesTo: string;
  relativePath: string;
};

export type AgentBoard = {
  tasks: AgentBoardTask[];
  columns: Record<TaskStatus, AgentBoardTask[]>;
  skills: SkillRegistryEntry[];
};

export type BoardResponse =
  | {
      ok: true;
      data: AgentBoard;
    }
  | {
      ok: false;
      error: {
        code: string;
        message: string;
      };
    };

export type ValidationIssue = {
  file: string;
  message: string;
};

export type ValidationResponse =
  | {
      ok: boolean;
      data: {
        exitCode: number | null;
        stdout: string;
        stderr: string;
        checkedTaskCount: number;
        issues: ValidationIssue[];
      };
    }
  | {
      ok: false;
      error: {
        code: string;
        message: string;
      };
    };

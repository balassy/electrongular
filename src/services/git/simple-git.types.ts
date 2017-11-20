export interface BranchSummary {
  all: string[];
}

export interface ListLogLine {
  author_email: string;
  author_name: string;
  date: string;
  hash: string;
  message: string;
}

export interface ListLogSummary {
  latest: ListLogLine;
}

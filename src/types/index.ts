export type RecurrenceType = "none" | "daily" | "weekly" | "monthly";
export type TaskStatus = "pending" | "completed";

export interface Task {
  id?: number;
  title: string;
  dueDate: Date | null;
  tags: string[];
  recurrence: RecurrenceType;
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
  notified?: boolean; // New: Tracks if the Web Notification has fired
}

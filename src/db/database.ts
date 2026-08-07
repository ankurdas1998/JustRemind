import Dexie, { type EntityTable } from "dexie";
import type { Task } from "../types";

// Extend Dexie to provide strong typing for our tables
const db = new Dexie("LocalReminderDB") as Dexie & {
  tasks: EntityTable<Task, "id">;
};

// Schema definition: '++id' auto-increments.
// We index dueDate and status for fast "Due Today" and "Completed" queries.
// '*tags' creates a multi-entry index for tag filtering.
db.version(1).stores({
  tasks: "++id, dueDate, status, *tags",
});

export { db };

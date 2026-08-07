import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/database";
import type { Task, RecurrenceType } from "../types";

export function useTasks() {
  // Query all tasks, ordered by due date. useLiveQuery makes this reactive.
  const allTasks =
    useLiveQuery(() => db.tasks.orderBy("dueDate").toArray()) ?? [];

  // Derived state for our focus buckets
  const pendingTasks = allTasks.filter((task) => task.status === "pending");
  const completedTasks = allTasks.filter((task) => task.status === "completed");

  const addTask = async (data: {
    title: string;
    dueDate: Date | null;
    recurrence: RecurrenceType;
  }) => {
    const newTask: Task = {
      title: data.title,
      dueDate: data.dueDate,
      recurrence: data.recurrence,
      tags: [], // Tags to be implemented in a future iteration
      status: "pending",
      createdAt: new Date(),
    };
    await db.tasks.add(newTask);
  };

  const toggleTaskStatus = async (
    id: number,
    currentStatus: Task["status"],
  ) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    await db.tasks.update(id, {
      status: newStatus,
      completedAt: newStatus === "completed" ? new Date() : undefined,
    });
  };

  const deleteTask = async (id: number) => {
    await db.tasks.delete(id);
  };

  return {
    pendingTasks,
    completedTasks,
    addTask,
    toggleTaskStatus,
    deleteTask,
  };
}

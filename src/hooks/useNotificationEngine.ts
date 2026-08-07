import { useEffect, useState } from "react";
import { db } from "../db/database";
import { useTasks } from "./useTasks";

export function useNotificationEngine() {
  const { pendingTasks } = useTasks();
  // Safe check for SSR/tests where window.Notification might not exist
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "default",
  );

  const requestPermission = async () => {
    if (typeof Notification === "undefined") return;
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  useEffect(() => {
    if (permission !== "granted") return;

    const checkTasksAndNotify = async () => {
      const now = new Date();

      // Find tasks that are due, haven't been notified, and have a due date
      const tasksToNotify = pendingTasks.filter(
        (task) => task.dueDate && task.dueDate <= now && !task.notified,
      );

      for (const task of tasksToNotify) {
        if (!task.id) continue;

        // Fire the native Web Notification
        // We cast to `any` here because TS DOM types sometimes omit 'vibrate'
        const options: any = {
          body: task.title,
          icon: "/vite.svg",
          vibrate: [200, 100, 200],
        };

        const notification = new Notification("Reminder Due!", options);

        // Click handler to bring the tab back into focus
        notification.onclick = () => {
          window.focus();
          notification.close();
        };

        // Mark as notified in IndexedDB to prevent duplicate firing
        await db.tasks.update(task.id, { notified: true });
      }
    };

    // Run the check every 10 seconds
    const intervalId = setInterval(checkTasksAndNotify, 10000);

    // Initial check on mount
    checkTasksAndNotify();

    return () => clearInterval(intervalId);
  }, [pendingTasks, permission]);

  return { permission, requestPermission };
}

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

        const notificationTitle = "Task Due!";

        // We cast to `any` here because TS DOM types sometimes omit 'vibrate'
        const notificationOptions: any = {
          body: task.title, // Use the actual task title from the database!
          icon: "/JustRemind/pwa-192x192.png",
          vibrate: [200, 100, 200],
        };

        // 1. Try Service Worker first (Required for Android Mobile)
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(
              notificationTitle,
              notificationOptions,
            );
          });
        }
        // 2. Fallback to standard Notification (For older Desktop browsers)
        else if (typeof Notification !== "undefined") {
          const fallbackNotification = new Notification(
            notificationTitle,
            notificationOptions,
          );

          fallbackNotification.onclick = () => {
            window.focus();
            fallbackNotification.close();
          };
        }

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

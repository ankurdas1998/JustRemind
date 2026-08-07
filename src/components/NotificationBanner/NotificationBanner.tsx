import { useNotificationEngine } from "../../hooks/useNotificationEngine";
import styles from "./NotificationBanner.module.css";

export function NotificationBanner() {
  const { permission, requestPermission } = useNotificationEngine();

  // Only show the banner if they haven't explicitly granted or denied yet
  if (permission !== "default") {
    return null;
  }

  return (
    <div
      className={styles.banner}
      role="alert"
      aria-live="polite">
      <span className={styles.message}>
        Enable notifications to get alerts when your reminders are due.
      </span>
      <button
        onClick={requestPermission}
        className={styles.enableBtn}
        aria-label="Enable web notifications">
        Enable Alerts
      </button>
    </div>
  );
}

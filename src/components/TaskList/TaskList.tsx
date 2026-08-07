import { useTasks } from "../../hooks/useTasks";
import styles from "./TaskList.module.css";

export function TaskList() {
  const { pendingTasks, toggleTaskStatus, deleteTask } = useTasks();

  if (pendingTasks.length === 0) {
    return (
      <p style={{ color: "var(--color-text-secondary)", textAlign: "center" }}>
        No pending tasks. You're all caught up!
      </p>
    );
  }

  return (
    <ul
      className={styles.list}
      aria-label="Pending Tasks">
      {pendingTasks.map((task) => (
        <li
          key={task.id}
          className={styles.item}>
          <div className={styles.content}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={task.status === "completed"}
              onChange={() => task.id && toggleTaskStatus(task.id, task.status)}
              aria-label={`Mark "${task.title}" as complete`}
            />
            <div className={styles.details}>
              <span
                className={`${styles.title} ${task.status === "completed" ? styles.completedText : ""}`}>
                {task.title}
              </span>
              {task.dueDate && (
                <span className={styles.meta}>
                  Due: {new Date(task.dueDate).toLocaleString()}
                  {task.recurrence !== "none" && ` ↻ ${task.recurrence}`}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => task.id && deleteTask(task.id)}
            className={styles.deleteBtn}
            aria-label={`Delete task: ${task.title}`}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

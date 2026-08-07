import { useForm } from "react-hook-form";
import { useTasks } from "../../hooks/useTasks";
import type { RecurrenceType } from "../../types";
import styles from "./TaskForm.module.css";

interface TaskFormData {
  title: string;
  dueDate: string; 
  recurrence: RecurrenceType;
}

export function TaskForm() {
  const { addTask } = useTasks();
  const { register, handleSubmit, reset } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      dueDate: "",
      recurrence: "none",
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    await addTask({
      title: data.title,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      recurrence: data.recurrence,
    });
    reset(); 
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      aria-label="Add new task">
      <div className={styles.inputGroup}>
        <label
          htmlFor="title"
          className={styles.label}>
          What do you need to do?
        </label>
        <input
          id="title"
          type="text"
          className={styles.input}
          placeholder="e.g., Take out the trash"
          required
          {...register("title", { required: true })}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label
            htmlFor="dueDate"
            className={styles.label}>
            When?
          </label>
          <input
            id="dueDate"
            type="datetime-local"
            className={styles.input}
            {...register("dueDate")}
          />
        </div>

        <div className={styles.inputGroup}>
          <label
            htmlFor="recurrence"
            className={styles.label}>
            Repeat?
          </label>
          <select
            id="recurrence"
            className={styles.select}
            {...register("recurrence")}>
            <option value="none">Does not repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className={styles.submitBtn}>
        Add Reminder
      </button>
    </form>
  );
}

import { Layout } from "./components/Layout/Layout";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { TaskList } from "./components/TaskList/TaskList";
import { NotificationBanner } from "./components/NotificationBanner/NotificationBanner";
import "./styles/theme.css";

export default function App() {
  return (
    <Layout>
      <NotificationBanner />

      <section aria-labelledby="quick-add-heading">
        <h2
          id="quick-add-heading"
          className="sr-only">
          Add Task
        </h2>
        <TaskForm />
      </section>

      <section aria-labelledby="task-list-heading">
        <h2
          id="task-list-heading"
          className="sr-only">
          Your Tasks
        </h2>
        <TaskList />
      </section>
    </Layout>
  );
}

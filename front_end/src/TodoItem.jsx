/* eslint-disable react/prop-types */
import styles from "./styles/HomeComponent.module.css"
export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  return (
    <li>
      <label>
        <input
          className={styles.btnCheckbox}
          type="checkbox"
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button onClick={() => deleteTodo(id)} className={styles.btnDelete} title="Delete">
        ✕
      </button>
    </li>
  );
}
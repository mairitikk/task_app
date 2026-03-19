/* eslint-disable react/prop-types */
import styles from "./styles/HomeComponent.module.css"
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import { Trans } from 'react-i18next';



function HomeComponent({ todos, addTodo, toggleTodo, deleteTodo }) {
    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <NewTodoForm onSubmit={addTodo} />
            </aside>

            <main className={styles.mainContent}>
                <h1 className={styles.header}>
                    <Trans
                        i18nKey="task"
                        components={{ span: <span /> }}
                    />
                </h1>
                <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            </main>
        </div>
    );
}

export default HomeComponent;
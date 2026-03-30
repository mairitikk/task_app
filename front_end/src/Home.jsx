import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import LogoutComponent from './LogoutComponent';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const API_URL = (import.meta.env.MODE === 'development') ? 'http://localhost:3000/api/' : 'https://task.drimt.co/back_end/api';


async function fetchTodos(token) {
    try {
        const response = await fetch(`${API_URL}todo/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`Failed to fetch todos: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
}

export default function App() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const { t } = useTranslation();

    const fetchData = async () => {
        const tokenValue = localStorage.getItem("TOKEN");
        if (!tokenValue) {
            return navigate('/');
        }

        const fetchedTodos = await fetchTodos(tokenValue);
        setTodos(fetchedTodos);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const insertTodo = async (title) => {
        try {
            const token = localStorage.getItem("TOKEN");
            if (!token) {
                return navigate('/');
            };

            const response = await fetch(`${API_URL}todo/`,  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title })
            });

            if (!response.ok) {
                throw new Error(`Failed to insert todo: ${response.status}`);
            }

            const newTodo = await response.json();
            fetchData();
            return newTodo;
        } catch (error) {
            console.error('Error inserting todo:', error);
            throw error;
        }
    };

    async function deleteTodo(id) {
        try {
            const token = localStorage.getItem("TOKEN");
            if (!token) {
                return navigate('/');
            }

            const response = await fetch(`${API_URL}todo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete todo: ${response.status}`);
            }

            setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
            console.log("Todo deleted successfully!");
        } catch (error) {
            console.error("Error deleting todo:", error);
            alert(t('deleteTodoError'));
        }
    }

    async function updateTodo(id, completed, title) {
        const token = localStorage.getItem("TOKEN");
        if (!token) {
            return navigate('/');
        }
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`${API_URL}todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ completed, title, user_id: userId })
            });

            if (!response.ok) {
                throw new Error(`Failed to update todo: ${response.status}`);
            }

            setTodos(currentTodos => {
                const updatedTodos = [...currentTodos];
                const indexToUpdate = updatedTodos.findIndex(todo => todo.id === id);

                if (indexToUpdate !== -1) {
                    updatedTodos[indexToUpdate] = { ...updatedTodos[indexToUpdate], completed };
                }

                return updatedTodos;
            });
            console.log("Todo updated successfully:", { completed });
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    }

    function toggleTodo(id, completed) {
        const currentTodo = todos.find(todo => todo.id === id);

        if (currentTodo) {
            updateTodo(id, completed, currentTodo.title)
                .then(updatedTodo => {
                    console.log("Todo updated successfully:", updatedTodo);
                    setTodos(prevTodos =>
                        prevTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo))
                    );
                })
                .catch(error => {
                    console.error("Error updating todo:", error);
                });
        } else {
            console.error("Todo not found:", id);
        }
    }

    return (
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '1.5rem 1rem' }}>
            <LogoutComponent />
            <HomeComponent
                todos={todos}
                addTodo={insertTodo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
            />
        </div>
    );
}
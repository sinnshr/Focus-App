import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import '../styles/Main.css';

const Main = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        if (task.trim() === '') return;
        setTasks([...tasks, { text: task, completed: false }]);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleTask = (index) => {
        setTasks(
            tasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <header>
                    <h1>My To-Do List</h1>
                </header>
                <main>
                    <section className="task-input">
                        <input
                            type="text"
                            id="newTask"
                            placeholder="Add a new task..."
                            onKeyDown={(e) => e.key === 'Enter' && addTask(e.target.value)}
                        />
                        <button onClick={() => addTask(document.getElementById('newTask').value)}>
                            Add Task
                        </button>
                    </section>
                    <section className="task-list">
                        <h2>Tasks:</h2>
                        <ul>
                            {tasks.map((task, index) => (
                                <li key={index} className={task.completed ? 'completed' : ''}>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(index)}
                                    />
                                    <span>{task.text}</span>
                                    <button onClick={() => deleteTask(index)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Main;

import React, { useState } from "react";

function MyComponent() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newDateTime, setNewDateTime] = useState("");
    const [compTasks, setCompTasks] = useState([]);

    function handleInput(e) {
        setNewTask(e.target.value);
    }

    function handleDateTimeInput(e) {
        setNewDateTime(e.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "" && newDateTime !== "") {
            setTasks(t => [...t, { text: newTask, datetime: newDateTime, isEditing: false }]);
            setNewTask("");
            setNewDateTime("");
        }
    }

    function removeTask(index) {
        const updatedTasks = tasks.filter((_, i) => index !== i);
        setTasks(updatedTasks);
    }

    function moveUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
            setTasks(updatedTasks);
        }
    }

    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];
            setTasks(updatedTasks);
        }
    }

    function markCompleted(index) {
        const completedTask = tasks[index];
        setCompTasks(c => [...c, completedTask]);
        removeTask(index);
    }

    function toggleEdit(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].isEditing = !updatedTasks[index].isEditing;
        setTasks(updatedTasks);
    }

    function updateTaskText(index, newText) {
        const updatedTasks = [...tasks];
        updatedTasks[index].text = newText;
        setTasks(updatedTasks);
    }

    function updateTaskDateTime(index, newDateTime) {
        const updatedTasks = [...tasks];
        updatedTasks[index].datetime = newDateTime;
        setTasks(updatedTasks);
    }

    return (
        <div className="To-Do-App">
            <h2>To-Do List</h2>
            <div className="add-task">
                <input
                    type="text"
                    placeholder="Enter your task..."
                    value={newTask}
                    onChange={handleInput}
                />
                <input
                    type="datetime-local"
                    value={newDateTime}
                    onChange={handleDateTimeInput}
                />
                <button className="add-button" onClick={addTask}>Add</button>
            </div>

            <div className="container">
                <h3>Tasks To Do</h3>
                <ul>
                    {tasks.map((task, index) => (
                        <li className="task-list" key={index}>
                            {task.isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        value={task.text}
                                        onChange={(e) => updateTaskText(index, e.target.value)}
                                    />
                                    <input
                                        type="datetime-local"
                                        value={task.datetime}
                                        onChange={(e) => updateTaskDateTime(index, e.target.value)}
                                    />
                                    <button onClick={() => toggleEdit(index)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <span className="text">{task.text}</span> <br />
                                    <small>{new Date(task.datetime).toLocaleString()}</small>
                                    <br />
                                    <input
                                        type="checkbox"
                                        onChange={() => markCompleted(index)}
                                    />
                                    <span className="custom-checkbox"></span>
                                    <button onClick={() => moveUp(index)}>⬆️</button>
                                    <button onClick={() => moveDown(index)}>⬇️</button>
                                    <button className="edit-button" onClick={() => toggleEdit(index)}>Edit</button>
                                    <button className="remove-button" onClick={() => removeTask(index)}>Remove</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {compTasks.length > 0 && (
                <div className="container">
                    <h3>Completed Tasks</h3>
                    <ul>
                        {compTasks.map((elem, index) => (
                            <li className="comp-task-list" key={index}>
                                {elem.text} - <small>{new Date(elem.datetime).toLocaleString()}</small>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MyComponent;

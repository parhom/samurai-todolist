import React, { useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]> ( [
      {id: v1(), title: 'JS', isDone: false},
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'React', isDone: false}
    ])

	const changeTaskStatus = (taskId:string, taskStatus: boolean) => {
		const newState = tasks.map(task => task.id === taskId ? {...task, isDone: taskStatus} : task)
		setTasks(newState);
	}

	const addTask = (title:string) => {
		const newTask = {id: v1(), title, isDone: false}
		const newArrayTasks = [newTask,...tasks]
		setTasks(newArrayTasks)
	}

	const removeTask = (taskId : string) => {
		const filteredTasks = tasks.filter(task => task.id !== taskId )
		setTasks(filteredTasks);
	}

	const [filter, setFilter] = useState<FilterValuesType>('all');

	const changeFilter = (filter:FilterValuesType ) => {
		setFilter(filter)
	}
    let taskForTodolist = tasks

	if (filter == 'active'){
		taskForTodolist = tasks.filter(task => task.isDone === false)
	}

	if (filter == 'completed'){
		taskForTodolist = tasks.filter(task => task.isDone === true)
	}

	return (
		<div className="App">
			<Todolist
				title="What to learn"
				tasks={taskForTodolist}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
				changeTaskStatus={changeTaskStatus}
				filter={filter}
			/>
		</div>
	);
}

export default App;
import React, { useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TaskStateType = {
	[key:string]: TaskType[]
}

function App() {
	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState<TaskStateType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})

	const changeTaskStatus = (todolistId : string, taskId:string, taskStatus: boolean) => {
		const newState = {...tasks, [todolistId] : tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: taskStatus} : task)}
		setTasks(newState);
	}

	const addTask = (todolistId : string, title:string) => {
		const newTask = {id: v1(), title, isDone: false}
		const newArrayTasks = {...tasks, [todolistId]:[newTask, ...tasks[todolistId]]}
		setTasks(newArrayTasks)
	}

	const removeTask = (todolistId : string, taskId : string) => {
		const filteredTasks = {...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId )}
		setTasks(filteredTasks);
	}

	const changeFilter = (todolistId: string, filter:FilterValuesType ) => {
		const newTodolists = todolists.map( tl => (tl.id === todolistId ? {...tl, filter} :  tl) )
		setTodolists(newTodolists)
	}

	const removeTodolist = (todolistId : string) => {
		const newTodolist = todolists.filter(tl=> tl.id !== todolistId )
		setTodolists(newTodolist)

		delete tasks[todolistId]

		setTasks({...tasks})
	}

	return (
		<div className="App">
			{todolists.map(tl=>{
				let taskForTodolist = tasks[tl.id]

				if (tl.filter == 'active'){
					taskForTodolist = tasks[tl.id].filter(task => task.isDone === false)
				}

				if (tl.filter == 'completed'){
					taskForTodolist = tasks[tl.id].filter(task => task.isDone === true)
				}

				return (
					<Todolist
						key={tl.id}
						todolistId={tl.id}
						removeTodolist={removeTodolist}
						title={tl.title}
						tasks={taskForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={tl.filter}
					/>
				)
			})}
		</div>
	);
}

export default App;
import React, {ChangeEvent, useRef, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type TodolistType = {
	title: string
	tasks: Array<TaskType>
	addTask: (title:string) => void
	removeTask: (taskId:string) => void
	changeFilter: (filter: FilterValuesType) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: TodolistType) => {
	const [taskTitle, setTaskTitle] = useState('')

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}

	const addTaskHandler = () => {
		addTask(taskTitle)
		setTaskTitle('')
	}

	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
				<Button title={'+'} onClick={addTaskHandler}/>
			</div>
			<ul>
				{
					tasks.map(
						task =>{
							return (
								<li key={task.id}>
									<input type="checkbox" checked={task.isDone}/>
									<span>{task.title}</span>
									<Button title={'X'} onClick={() => { removeTask(task.id) }} />
								</li>
							)
						}
					)
				}
			</ul>
			<div>
				<Button title={'All'} onClick={() => changeFilter('all')}/>
				<Button title={'Active'} onClick={() => changeFilter('active')}/>
				<Button title={'Completed'} onClick={() => changeFilter('completed')}/>
			</div>
		</div>
	)
}
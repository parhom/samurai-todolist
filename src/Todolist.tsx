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
	changeTaskStatus: (id:string, isDone:boolean) => void
	filter: string
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter}: TodolistType) => {
	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string|null>(null)

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}

	const addTaskHandler = () => {
		if(taskTitle.trim() !== ''){
			addTask(taskTitle.trim())
			setTaskTitle('')
		} else {
			setError('Title is required')
		}
	}

	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input
					className={error ? 'error' : ''}
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
				<Button title={'+'} onClick={addTaskHandler}/>
				{error && <div className={'error-message'}>{error}</div>}
			</div>
			<ul>
				{
					tasks.map(
						task =>{
							const changeTaskStatusHandler = (event:ChangeEvent<HTMLInputElement>) => {
								changeTaskStatus(task.id ,event.currentTarget.checked)
							}

							return (
								<li key={task.id} className={task.isDone ? 'is-done' : ''}>
									<input type="checkbox" onChange={changeTaskStatusHandler} checked={task.isDone}/>
									<span>{task.title}</span>
									<Button title={'X'} onClick={() => { removeTask(task.id) }} />
								</li>
							)
						}
					)
				}
			</ul>
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onClick={() => changeFilter('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'} onClick={() => changeFilter('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => changeFilter('completed')}/>
			</div>
		</div>
	)
}
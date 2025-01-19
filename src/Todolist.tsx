import React, {ChangeEvent} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type TodolistType = {
	todolistId: string
	removeTodolist : ( todolistId : string ) => void
	title: string
	tasks: Array<TaskType>
	addTask: (todolistId:string, title:string) => void
	removeTask: (todolistId:string, taskId:string) => void
	changeFilter: (todolistId:string, filter: FilterValuesType) => void
	changeTitle: (todolistId:string, title: string) => void
	changeTaskStatus: (todolistId:string, id:string, isDone:boolean) => void
	changeTaskTitle: (todolistId:string, id:string, title:string) => void
	filter: string
}

export const Todolist = ({todolistId, removeTodolist, title, tasks, removeTask, changeFilter, changeTitle, addTask, changeTaskStatus, changeTaskTitle, filter}: TodolistType) => {

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addItem = (title:string) => {
		addTask(todolistId, title)
	}

	const onAllClickHandler = () => {
		changeFilter(todolistId,'all')
	}

	const onActiveClickHandler = () => {
		changeFilter(todolistId,'active')
	}

	const onCompletedClickHandler = () => {
		changeFilter(todolistId,'completed')
	}

	const changeTitleHendler = (title:string) => {
		changeTitle(todolistId, title)
	}

	return (
		<div className={'todolist-title-container'}>
			<h3><EditableSpan title={title} changeTaskTitle={changeTitleHendler}/></h3>
			<Button title={'x'} onClick={removeTodolistHandler} />
			<AddItemForm addItem={addItem}/>
			<ul>
				{
					tasks.map(
						task =>{
							const changeTaskStatusHandler = (event:ChangeEvent<HTMLInputElement>) => {
								changeTaskStatus(todolistId, task.id ,event.currentTarget.checked)
							}

							const removeTaskHandler = () => {
								removeTask(todolistId, task.id)
							}

							const changeTaskTitleHendler = (title:string) => {
								changeTaskTitle(todolistId, task.id, title)
							}

							return (
								<li key={task.id} className={task.isDone ? 'is-done' : ''}>
									<input type="checkbox" onChange={changeTaskStatusHandler} checked={task.isDone}/>
									<EditableSpan title={task.title} changeTaskTitle={changeTaskTitleHendler}/>
									<Button title={'X'} onClick={removeTaskHandler} />
								</li>
							)
						}
					)
				}
			</ul>
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onClick={onAllClickHandler}/>
				<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'} onClick={onActiveClickHandler}/>
				<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'} onClick={onCompletedClickHandler}/>
			</div>
		</div>
	)
}


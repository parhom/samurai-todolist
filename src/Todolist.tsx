import React from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

type TodolistType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId:number) => void
	changeFilter: (filter: FilterValuesType) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter}: TodolistType) => {
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input type="text"/>
				<button>+</button>
			</div>
			<ul>
				{
					tasks.map(
						task =>{
							return (
								<li>
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
import React, { useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]> ( [
      {id: 1, title: 'JS', isDone: false},
      {id: 2, title: 'CSS', isDone: true},
      {id: 3, title: 'React', isDone: false}
    ])

	const removeTask = (taskId : number) => {
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
			/>
		</div>
	);
}

export default App;
import React, {ChangeEvent, useState} from "react";

export type EditableSpanType = {
	title: string
	changeTaskTitle: (title:string) => void
}
export const EditableSpan = ({title, changeTaskTitle}: EditableSpanType) => {
	const [isEditMode, setIsEditMode] = useState(false);
	const [newTitle, setNewTitle] = useState(title)

	const activateVievMode = () => {
		setIsEditMode(!isEditMode)
		changeTaskTitle(newTitle)
	}

	const titleChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value)
	}

	return (
		<>
		{
			isEditMode ?
				(<input type="text" value={newTitle} onChange={titleChangeHandler} onBlur={activateVievMode} autoFocus/>) :
				( <span onDoubleClick={activateVievMode}>{title}</span> )
		}
		</>
		)
}
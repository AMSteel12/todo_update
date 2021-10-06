import React, {useState} from 'react'

export default function CreateTodoItem ({user, dispatch}) {

    const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	function handleTitle (evt) {setTitle(evt.target.value)}
	function handleDescription (evt) {setDescription(evt.target.value)}

	/*
	function handleCreateTodo () {
		const newTodo = {title, description, creator:user}
		setTodos([newTodo, ...todos])
	}
	*/

    return (
	    <form onSubmit={evt => {evt.preventDefault(); dispatch({type: "CREATE_TODO", title, description, creator:user})}}>

	      <div>Todo item created by: <b>{user}</b></div>

	      <div>
	        <label htmlFor="create-todo-title">Title:</label>
	        <input type="text" value={title} onChange={handleTitle} name="create-todo-title" id="create-todo-title" />
	      </div>

	      <textarea value={description} onChange={handleDescription}/>
	      <input type="submit" value="Create Todo Item" />
	    </form>
            )
}

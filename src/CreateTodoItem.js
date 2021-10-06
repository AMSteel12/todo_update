import React, {useState} from 'react'

export default function CreateTodoItem ({user, /*todos*/, dispatch}) {

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
	    //<div>	// For DELETE_TODO
	    <form onSubmit={evt => {evt.preventDefault(); dispatch({type: "CREATE_TODO", title, description, creator:user})}}>

	      <div>Todo item created by: <b>{user}</b></div>

	      <div>
	        <label htmlFor="create-todo-title">Title:</label>
	        <input type="text" value={title} onChange={handleTitle} name="create-todo-title" id="create-todo-title" />
	      </div>

	      <textarea value={description} onChange={handleDescription}/>
	      <input type="submit" value="Create Todo Item" />
	    </form>
		
		// Working on type: DELETE_TODO;  Currently, it deletes all todo-items, including initial todo-items
		// Working on buttons/creating multiple buttons for DELETE_TODO

		/*
		<div>
		  {todos.map(todo => (
		  <div className="Row" key={todo.id}>
		    <p>{todo.text}</p>
		    <button onClick={() => dispatch({type: "DELETE_TODO", id:todo.id})}>
			Remove todo item 
			</button>
			</div>
		  ))}
		   </div>
                 </div>
		*/

            )
}

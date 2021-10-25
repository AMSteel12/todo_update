import React, {useState, useEffect} from 'react'
import {StateContext} from './Contexts'
import {useResource} from 'react-request-hook'
import {useContext} from 'react/cjs/react.development'


export default function CreateTodoItem () { //{user, todos, dispatch}) {

    const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const {dispatch} = useContext(StateContext)

	const [todo , createTodoItem] = useResource(({title, description, completeStatus, completedDate}) => ({
        url: '/todos',
        method: 'post',
        data: {title, description, completeStatus, completedDate}
    }));

	function handleTitle (evt) {setTitle(evt.target.value)}
	function handleDescription (evt) {setDescription(evt.target.value)}
	
    function handleCreate () {
        createTodoItem({title, description, completeStatus: false, completedDate: null});
		setTitle('');
		setDescription('');
};

	useEffect(() => {
		// fixing issue of re-populating previous todo item 
        if (todo && todo.isLoading === false && todo.data) {
			const newTodoItem = { 
                title: todo.data.title,
                description: todo.data.description, 
                completeStatus: todo.data.completeStatus,
                completedDate: todo.data.completedDate,
				id: todo.data.id
              };
            dispatch({type: 'CREATE_TODO', newTodoItem})
        }
    }, [todo]);

	/*
	function handleCreateTodo () {
		const newTodo = {title, description, creator:user}
		setTodos([newTodo, ...todos])
	}
	*/

    return (
	    <form onSubmit={evt => {evt.preventDefault(); handleCreate();}}>

	      <div>
	        <label htmlFor="create-todo-title">Title:</label>
	        <input type="text" value={title} onChange={handleTitle} name="create-todo-title" id="create-todo-title" />
	      </div>
		  <br />

	      <textarea value={description} onChange={handleDescription}/>
	      <input type="submit" value="Create Item" disabled={title.length === 0} />
	    </form>
        )
}
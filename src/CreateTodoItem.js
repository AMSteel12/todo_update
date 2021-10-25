import React, {useState, useEffect} from 'react'
import {StateContext} from './Contexts'
import {useResource} from 'react-request-hook'
import {useContext} from 'react/cjs/react.development'


export default function CreateTodoItem () { //{user, todos, dispatch}) {

    const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const {dispatch} = useContext(StateContext)

	const [todo , createTodoItem] = useResource(({title, description, createdDate, completeStatus, completedDate}) => ({
        url: '/todos',
        method: 'post',
        data: {title, description, createdDate, completeStatus, completedDate}
    }));

	function handleTitle (evt) {setTitle(evt.target.value)}
	function handleDescription (evt) {setDescription(evt.target.value)}
	
    function handleCreate () {
        createTodoItem({title, description, createdDate: Date.now(), completeStatus: false, completedDate: null })
		setTitle('');
		setDescription('');
};


	useEffect(() => {
        if (todo && todo.data) {
			const newTodo = { 
                title: todo.data.title,
                description: todo.data.description, 
				createdDate: todo.data.createdDate,
                completeStatus: todo.data.completeStatus,
                completedDate: todo.data.completedDate,
				id: todo.data.id
              };
			delete todo.data;
            dispatch({type: 'CREATE_TODO', newTodo})
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

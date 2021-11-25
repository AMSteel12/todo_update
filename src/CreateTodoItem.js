import React, {useState, useEffect, useContext} from 'react'
import {StateContext} from './Contexts'
import {useResource} from 'react-request-hook'
import {useNavigation} from 'react-navi'

export default function CreateTodoItem () { 			//{user, todos, dispatch}) {

    const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const [todo , createTodoItem] = useResource(({title, description, author, completeStatus, completedDate}) => ({
        url: '/todo',
        method: 'post',
		headers: {"Authorization": `${state.user.access_token}`},
        data: {title, description, author, completeStatus, completedDate}
    }))

	const navigation = useNavigation()

	const {state, dispatch} = useContext(StateContext)

	const {user} = state;

	function handleTitle (evt) {setTitle(evt.target.value)}

	function handleDescription (evt) {setDescription(evt.target.value)}
	
    function handleCreate () {
        createTodoItem({title, description, author: user.username})
};

	useEffect(() => {
		// fixing issue of re-populating previous todo item 
		if (todo && todo.data) {
			dispatch({type: 'CREATE_TODO', title: todo.data.title, description: todo.data.description, id: todo.data.id, author: user.username, completeStatus: todo.data.completeStatus, completedDate: todo.data.completedDate})
			console.log(todo.data)
			navigation.navigate('/todo/${todo.data.id}')
		}
	}, [todo])


	/*
	function handleCreateTodo () {
		const newTodo = {title, description, creator:user}
		setTodos([newTodo, ...todos])
	}
	*/

    return (
	    <form onSubmit={evt => {evt.preventDefault(); handleCreate();}}>

		  <div>Author: <b>{user.username}</b></div>

	      <div>
	        <label htmlFor="create-todo-title">Title:</label>
	        <input type="text" value={title} onChange={handleTitle} name="create-todo-title" id="create-todo-title" />
	      </div>

	      <textarea value={description} onChange={handleDescription}/>
	      <input type="submit" value="Create Todo Item" disabled={title.length === 0} />
	    </form>
        )
}
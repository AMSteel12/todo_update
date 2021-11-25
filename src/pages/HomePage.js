import React, {useEffect, useContext} from 'react'
import {StateContext} from '../Contexts'
import {useResource} from 'react-request-hook'
import {Link} from 'react-navi'
import TodoList from '../TodoList'
import CreateTodoItem from '../CreateTodoItem'


export default function HomePage() {
    const {state, dispatch} = useContext(StateContext)

    const {user} = state
    
    const [todos, getTodos] = useResource(() => ({
        url: '/todo',
        method: 'get',
        headers: {"Authorization": `${state.user.access_token}`}
    }))


    const [users, getUsers] = useResource(() => ({
        url: "/auth",
        method: "get",
      }))
    

    useEffect(getTodos, [state.user.access_token])

    useEffect(getUsers, []);


    useEffect(() => {
        if (todos && todos.data) {
            console.log(todos.data)
            dispatch({type: 'FETCH_TODOS', todos: todos.data.todos})
        }
    }, [todos])


    useEffect(() => {
        if (users && users.data) {
            console.log(users.data)
            dispatch({type: 'FETCH_USERS', users: users.data.users})
        }
    }, [users])


    useEffect(() => {
        if (user.username) {
            document.title = 'Todo for ${user.username}';
        } else {
            document.tilte = 'Todo';
        }
    }, [user])


    return (
        <>
            <Link href="/users">Return to List of Registered Users</Link>
            {user.username && <CreateTodoItem/>}
            <TodoList/>
        </>
    )
}
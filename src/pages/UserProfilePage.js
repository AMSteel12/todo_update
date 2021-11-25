import React, {useEffect, useContext} from 'react'
import {StateContext} from '../Contexts'
import {useResource} from 'react-request-hook'
import {Link} from 'react-navi'
import TodoItem from '../TodoItem'

export default function UserProfilePage({userId}) {

    const {state} = useContext(StateContext)

    const {users} = state

    const todos = 
        user ? state.todos.filter(
            (todo) => todo.author === user.username): [];

    const user = users.find(
        (user) => user._id && user._id.toString() === userId);


    return (
        <>
            <Link href="/users">Return to List of Registered Users</Link>
              <div>
                {todos.map((t, i) => (
                  <TodoItem {...t} title={t.title} author={t.author} key={"todo-" + i} />
                ))}
              </div>
        </>
        );
}



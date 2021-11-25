import React, {useEffect, useContext} from 'react'
import {useResource} from 'react-request-hook'
import {StateContext} from '../Contexts'
import {Link} from 'react-navi'
import TodoItem from '../TodoItem'


export default function UsersPage() {

    const {state} = useContext(StateContext);

    const users = Array.isArray(state.users) ? state.users: []

    console.log(state.users)


    return (
        <>
        <Link href="/">Go View User Todos</Link>
        <div>
            {users.map((user, id) => (
                <div key={id}>
                  <Link href={`/users/${user._id}`}>{user.username}</Link>
                </div>
        ))}
      </div>
    </>
  );
}
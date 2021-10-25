import React from 'react'
import {useContext} from 'react/cjs/react.development'
import {StateContext} from '../Contexts'

export default function Logout() {   //{user, dispatchUser}) {
    
    const {state, dispatch} = useContext(StateContext)
    const {user} = state

    return (
	    <form onSubmit={evt => {evt.preventDefault(); dispatch({type:'LOGOUT'});}}>
  	        Currently logged in as: <b>{user}</b>
                <input type="submit" value="logout" />
	    </form>
    )
}

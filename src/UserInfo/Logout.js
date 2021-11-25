import React, {useContext} from 'react'
import {StateContext} from '../Contexts'

export default function Logout() {   //{user, dispatchUser}) {
    
    const {state, dispatch} = useContext(StateContext)
    const {user} = state

    return (
	    <form onSubmit={evt => {evt.preventDefault(); dispatch({type:'LOGOUT'});}}>
  	        Currently logged in as: <b>{user.username}</b>
            <input type="submit" value="Logout"/>
	    </form>
    )
}
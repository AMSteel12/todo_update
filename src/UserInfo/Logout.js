import React from 'react'

export default function Logout({user, dispatchUser}) {
    
    return (

	    <form onSubmit={evt => {evt.preventDefault(); dispatchUser({type:"LOGOUT"})} }>
  	        Currently logged in as: <b>{user}</b>
                <input type="submit" value="Logout" />
	    </form>
    )
}

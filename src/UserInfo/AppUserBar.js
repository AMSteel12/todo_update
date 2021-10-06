import React /*,{useState}*/ from 'react'
import Logout from './Logout'
import Login from './Login'
import RegisterNewUser from './RegisterNewUser'

export default function AppUserBar({user, dispatchUser}) {

	//const [user, setUser] = useState('')

    //const username = ''
    //const username ='Aaron Min'

    if (user) {
		return <Logout user={user} dispatchUser={dispatchUser}/>
    }

    else {
		return (
	    	<>
			  <Login dispatchUser={dispatchUser}/>
			  <RegisterNewUser dispatchUser={dispatchUser}/>
			</>
		)
    }
}
	
    
    

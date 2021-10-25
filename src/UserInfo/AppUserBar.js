import React, {useContext} from 'react'  		//remove useState
import Logout from './Logout'
import Login from './Login'
import RegisterNewUser from './RegisterNewUser'
import {StateContext} from '../Contexts'

export default function AppUserBar(){  //user, dispatchUser}) {

	//const [user, setUser] = useState('')
    //const username = ''
    //const username ='Aaron Min'

    const {state} = useContext(StateContext)

    if (state.user) {
		return <Logout /> 		
    }

    else {
		return (
	    	<>
			  <Login />		
			  <br />
			  <br />			
			  <RegisterNewUser />	
			</>
		)
    }
}
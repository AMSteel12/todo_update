import React, {useContext, useState} from 'react'  		
import Login from './Login'
import RegisterNewUser from './RegisterNewUser'
import {StateContext} from '../Contexts'
import {Button} from 'react-bootstrap'


export default function AppUserBar(){  //user, dispatchUser}) {

	//const [user, setUser] = useState('')
    //const username = ''
    //const username ='Aaron Min'

	const Logout = React.lazy(() => import('./Logout'))

    const {state} = useContext(StateContext)

	const [showLogin, setShowLogin] = useState(false)
	const [showRegister, setShowRegister] = useState(false)

    if (state.user.username) {
		return <Logout/> 		
    }

    else {
		return (
            <div className="justify-content-end">
                <Button variant="link" onClick={(e) => setShowLogin(true)}>
                    Login
                </Button>
                <Login show={showLogin} handleClose={() => setShowLogin(false)} />
                <Button variant="link" onClick={(e) => setShowRegister(true)}>
                    Register
                </Button>
                <RegisterNewUser show={showRegister} handleClose={() => setShowRegister(false)} />
            </div>
		)
    }
}
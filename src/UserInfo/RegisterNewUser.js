import React, {useState, useEffect} from 'react'
import {useContext} from 'react/cjs/react.development'
import {useResource} from 'react-request-hook';
import {StateContext} from '../Contexts'

export default function RegisterNewUser() { //{dispatchUser}) {

	const {dispatch} = useContext(StateContext)

	const [formData, setFormData] = useState( {
		username: '',
		password: '',
		repeatPassword: ''
	}
	)

	const [user, register] = useResource((username, password) => ({
		url: '/users',
		method: 'post',
		data: {username, password}
	  }))


	useEffect(() => {
		if (user && user.data) {
			dispatch({type: 'REGISTER', username: user.data.username})
		}
	  }, [user])

	//const [userID, setUserID] = useState('')
	//const [userPassword, setUserPassword] = useState('')
	//const [repeatInputPassword, setRepeatInputPassword] = useState('')

	function handleUserID (evt) {setFormData({...formData, username: evt.target.value});}
	function handleUserPassword (evt) {setFormData({...formData, password: evt.target.value});}
	function handleRepeatInputPassword (evt) {setFormData({...formData, repeatPassword: evt.target.value});}
	

    return (
	    <form onSubmit={evt => {evt.preventDefault(); register(formData.username, formData.password);}}>
	        <label htmlFor="register-userid">User ID:</label>
	        <input type="text" value={formData.username} onChange={handleUserID} name="register-userid" id="register-userid" />
	
	        <label htmlFor="register-password">Password:</label>
	        <input type="password" value={formData.password} onChange={handleUserPassword} name="register-password" id="register-password" />

	        <label htmlFor="register-password-again"> Please enter password again to confirm:</label>
	        <input type="password" value={formData.repeatPassword} onChange={handleRepeatInputPassword} name="register-password-again" id="register-password-again" />
  
	        <input type="submit" value="Signup" disabled={formData.username.length === 0 || formData.password.length === 0 || formData.password !== formData.repeatPassword} />
	    </form>
    )
}

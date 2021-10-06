import React, {useState} from 'react'

export default function RegisterNewUser( {dispatchUser}) {

	const [formData, setFormData] = useState( {
		userID: "",
		userPassword: "",
		repeatInputPassword: ""
	}
	)

	//const [userID, setUserID] = useState('')
	//const [userPassword, setUserPassword] = useState('')
	//const [repeatInputPassword, setRepeatInputPassword] = useState('')

	//function handleUserID (evt) {setUserID(evt.target.value)}
	//function handleUserPassword (evt) {setUserPassword(evt.target.value)}
	//function handleRepeatInputPassword (evt) {setRepeatInputPassword(evt.target.value)}

    return (
	    <form onSubmit={evt => {evt.preventDefault(); dispatchUser({type:"REGISTER", username: formData.userID}); }}  >
	        <label htmlFor="register-userid">User ID:</label>
	        <input type="text" value={formData.userID} onChange={evt => setFormData({...formData, userID: evt.target.value})} name="register-userid" id="register-userid" />
	
	        <label htmlFor="register-password">Password:</label>
	        <input type="password" value={formData.userPassword} onChange={evt => setFormData({...formData, userPassword: evt.target.value})} name="register-password" id="register-password" />

	        <label htmlFor="register-password-again"> Please enter password again:</label>
	        <input type="password" value={formData.repeatInputPassword} onChange={evt => setFormData({...formData, repeatInputPassword: evt.target.value})} name="register-password-again" id="register-password-again" />
  
	        <input type="submit" value="Signup!" disabled={formData.userID.length === 0 || formData.userPassword.length === 0 || formData.userPassword !== formData.repeatInputPassword} />
	    </form>
    )
}

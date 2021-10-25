import React, {useState, useEffect} from 'react'
import {useContext} from 'react/cjs/react.development'
import {StateContext} from '../Contexts'
import {useResource} from 'react-request-hook';


export default function Login() { 		//{dispatchUser} ) {

	const {dispatch} = useContext(StateContext)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [userLoginFailed, setUserLoginFailed] = useState(false)

	function handleUsername (evt) {setUsername(evt.target.value)}
	function handlePassword (evt) {setPassword(evt.target.value)}

	const [user, login] = useResource(() => ({
        url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
        method: 'get'
    }));

	useEffect(() => {
        if (user && user.data) {
            if (user.data.length > 0) {
                setUserLoginFailed(false);
                dispatch({type: 'LOGIN', username: user.data[0].username})
            } else {
                setUserLoginFailed(true)
            }
        } 
    }, [user]);

    return (
					// removed dispatch({type:"LOGIN", username});}}> Check is username/password in db.json
	    <form onSubmit={evt => {evt.preventDefault(); login(); }}> 
	        <label htmlFor="login">User ID:</label>
	        <input type="text" value={username} onChange={handleUsername} name="login-userid" id="login-userid" />
	        <label htmlFor="login-password">Password:</label>
	        <input type="password" value={password} onChange={handlePassword} name="login-password" id="login-password" />
            <input type="submit" value="Login" disabled={username.length === 0 || password.length === 0} />
			{userLoginFailed && <span style={{color: 'crimson'}}> The username and/or password is not valid. Try again. </span>}
	    </form>
    )
}
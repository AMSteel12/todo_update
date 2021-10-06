import {/*useState,*/ useReducer} from 'react'
import AppUserBar from './UserInfo/AppUserBar'
import CreateTodoItem from './CreateTodoItem'
import TodoList from './TodoList'
//import react from 'react'

function App(){

    //const [user, setUser] = useState('')


    const initialTodos = [
	{
	    title:"Todo item #1", 
            description:"Description:  Some new todo description",
            dateCreated: "{dateCreated}",
            complete:"Completed todo item",
            dateCompleted:"{dateCompleted}"
	},

	{
	    title:"Todo item #2", 
            description:"Description:  Another new todo description",
            dateCreated: "{dateCreated}",
            complete:"Completed todo item",
            dateCompleted:"{dateCompleted}"
	},

	{
	    title:"Todo item #3", 
            description:"Description:  Still another new todo description",
            dateCreated: "{dateCreated}",
            complete:"Completed todo item",
            dateCompleted:"{dateCompleted}"
	}
    ]
   
  //  const [todos, setTodos] = useState(initialTodos)      see useReducer below

    function userReducer (state, action) {
        switch (action.type) {
            case 'LOGIN':
            case 'REGISTER':
                return action.username
            case 'LOGOUT':
                return ''
            default:
                return state
        }
    }

    function todosReducer (state, action) {
        switch (action.type) {
            case 'CREATE_TODO':
                const newToDo = {
                    title: action.title,
                    description: action.description,
                    creator: action.creator
                }
                return [newToDo, ...state]
            default:
                throw new Error()
        }
    }

    const [user, dispatchUser] = useReducer(userReducer, '')

    const [ todos, dispatchToDos] = useReducer(todosReducer, initialTodos)

  

    return (
       <div>
         <AppUserBar user={user} dispatchUser={dispatchUser} />
       <br/><br/><hr/><br/><br/>
	     {user && <CreateTodoItem user={user} dispatch={dispatchToDos}/>}
	     <TodoList todos={todos} />  
       </div>
    )	    	
}

 
export default App;

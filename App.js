import React, {useReducer, useEffect, useState} from 'react';
import {useResource} from 'react-request-hook';
import AppUserBar from './UserInfo/AppUserBar';
import CreateTodoItem from './CreateTodoItem';
import TodoList from './TodoList';        
import appReducer from './reducers';
import Header from './Header';
import ChangeTheme from './ChangeTheme';
import {ThemeContext, StateContext} from './Contexts';
//import react from 'react';

function App(){

    //const [user, setUser] = useState('')

    const [todos, getTodos] = useResource(() => ({
        url: '/todos',
        method: 'get'
    }) 
    );

    /*
    const deleteTodos = useResource((id) => ({
        url:'/todos/${id}',
        method: 'delete'
    })
    )
    */

    const [state, dispatch] = useReducer(appReducer, {user: '', todos:[], theme:{}})

    useEffect(getTodos, [])

    useEffect(() => {
        if (todos && todos.data) {
            dispatch({type: 'FETCH_TODOS', todos: todos.data})
        }
    }, [todos]);


    const {user} = state;

    const [theme, setTheme] = useState({
        primaryColor: 'dodgerblue',
        secondaryColor: 'darkorange'
     })

  // Removing initialTodos from HW #2
/*
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
    */

   
  //  const [todos, setTodos] = useState(initialTodos)      see useReducer below


  /*
    // moved to ./reducers
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
            case 'CREATE_TODO': {
                const newToDo = {
                    title: action.title,
                    description: action.description,
                    creator: action.creator

                }
                return [newToDo, ...state]
            }

            case 'TOGGLE_TODO':
                return state.map((t, i) => {
                    if(i === action.postId) {
                        t.complete = action.complete;
                        t.completedDate = Date.now();
                        console.log(t)
                    }
                    return t;
                })

            case 'DELETE_TODO': {
                return state.filter((t,i) => i !== action.todoId)
            }
            
            default:
                return state
        }
    }
    */

   // const [user, dispatchUser] = useReducer(userReducer, '')

   // const [ todos, dispatchToDos] = useReducer(todosReducer, initialTodos)

  
   return (
    <div>
      <ThemeContext.Provider value={theme}>
        <StateContext.Provider value={{state, dispatch}}>
          <Header text="To-Do Items" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <AppUserBar />
          <br/><br/><hr/><br/> 
          {user && <CreateTodoItem /> }
          <TodoList />
        </StateContext.Provider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App;
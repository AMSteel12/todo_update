import React, {useReducer, useEffect, useState} from 'react';
import {mount, route} from 'navi';
import {Router, View} from 'react-navi';
import {Container} from 'react-bootstrap';
import appReducer from './reducers';
import {ThemeContext, StateContext} from './Contexts';
import CreateTodoItem from './CreateTodoItem';
import AppUserBar from '../UserInfo'
import HeaderBar from './pages/HeaderBar';
import UsersPage from './pages/UsersPage';
import UserProfilePage from './pages/UserProfilePage';
import HomePage from './pages/HomePage';
import TodosListPage from './pages/TodosListPage';

function App(){

    /*
    const [todos, getTodos] = useResource(() => ({
        url: '/todos',
        method: 'get'
    }) 
    );
    */

    const [state, dispatch] = useReducer(appReducer, {user: {}, usersList: [], todos:[]})

    //useEffect(getTodos, [])

    /*
    useEffect(() => {
        if (todos && todos.data) {
            dispatch({type: 'FETCH_TODOS', todos: todos.data})
        }
    }, [todos]);
    */

    const {user} = state;

    const [theme, setTheme] = useState({
        primaryColor: 'dodgerblue',
        secondaryColor: 'darkorange'
     })
     

    const routes = mount({
        '/': route({view: <AppUserBar/>}),
        '/users': route({view: <UsersPage/>}),
        '/users/:userId': route(req => {
            console.log(req)
            return {view: <UserProfilePage userId={req.params.userId}/>}
        }),
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
	}]
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
        <StateContext.Provider value={{state: state, dispatch: dispatch}}>
            <Router routes={routes}>
                <Container>
                    <HeaderBar setTheme={setTheme}/>
                    <hr/>
                    <View/>
                </Container>
                </Router>
        </StateContext.Provider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App;
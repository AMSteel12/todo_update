function userReducer (state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                'username':  action.username,
                'access_token': action.access_token
            }

        case 'REGISTER':
            return {
                'username':  action.username,
                'access_token': action.access_token
            }

        case 'LOGOUT':
            return {
                'username':  undefined,
                'access_token': undefined
            }
            
        default:
            return state;
    }
}

function usersReducer (state, action) {
    switch (action.type) {
        case 'FETCH_USERS':
            return action.users

        default:
            return state;
            }
          }


function todosReducer (state, action) {
    switch (action.type) {
        case 'CREATE_TODO': 
            const newTodo = { 
                id: action.id,
                title: action.title,
                description: action.description, 
                author: action.author,
                completeStatus: action.completeStatus,
                completedDate: action.completedDate
            }
            return [ newTodo, ...state ]


     
        case 'TOGGLE_TODO':
            return state.map((t) => {
                if(t.id === action.todoId) {
                    t.completeStatus = action.completeStatus;
                    t.completedDate = action.completedDate;
                }
                return t;
            })

        case 'DELETE_TODO':
            return state.filter((t) => t.id !== action.todoId)

        case 'FETCH_TODOS':
            return action.todos
            
        default:
            return state;
        }
      }

  export default function appReducer (state, action) {
    return {
        user: userReducer(state.user, action),
        users: usersReducer(state.users, action),
        todos: todosReducer(state.todos, action)
    }
}

function userReducer (state, action) {
    switch (action.type) {
        case 'LOGIN':

        case 'REGISTER':
            return action.username;

        case 'LOGOUT':
            return '';
            
        default:
            return state;
    }
}

function todosReducer (state, action) {
    switch (action.type) {
        case 'CREATE_TODO': { 

              // Handling duplication issue for re-populatings todos
                return [action.newTodoItem, ...state];
        }
     
        case 'TOGGLE_TODO': {
            return state.map((todo) => {
                if(todo.id === action.id) {
                    todo.completeStatus = action.completeStatus;
                    todo.completedDate = action.completedDate;
                    //console.log(t)
                }
                return todo;
            });}

        case 'DELETE_TODO':
            return state.filter((t) => t.id !== action.id)

        case 'FETCH_TODOS':
            return action.todos
            
        default:
           return state;
    }
  }

  export default function appReducer (state, action) {
    return {
        user: userReducer(state.user, action),
        todos: todosReducer(state.todos, action)
    }
}

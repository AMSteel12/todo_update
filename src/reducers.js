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

              // Handling duplication issue for multiple todos
            const filterTodo = state.filter((t) => t.id === action.newTodo.id);
            if (filterTodo.length === 0) {
                return [action.newTodo, ...state];
            }
            return state;
        }
     
        case 'TOGGLE_TODO':
            return state.map((t, i) => {
                if(i === action.id) {
                    t.completeStatus = action.completeStatus;
                    t.completedDate = action.completedDate;
                    //console.log(t)
                }
                return t;
            })

        case 'DELETE_TODO':
            return state.filter((t,i) => i !== action.id)

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

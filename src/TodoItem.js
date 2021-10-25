import React, {useContext, useEffect} from 'react'
import {useResource} from 'react-request-hook';
import {ThemeContext, StateContext} from './Contexts'

export default function TodoItem({title, description, createdDate, completeStatus, completedDate, id}) {

    // Removed static completed items from HW 2
   // const dateCreated = new Date().toDateString();
   // const dateCompleted = new Date().toDateString();

   const {secondaryColor} = useContext(ThemeContext)
   const {dispatch} = useContext(StateContext)

   const [todo, deleteTodo] = useResource(() => ({
    url: `/todos/${id}`,
    method: 'delete',
  }));


  const [editTodo, toggleTodo] = useResource(({completeStatus, completedDate}) => ({
    url: `/todos/${id}`,
    method: 'patch',
    data: {completeStatus, completedDate},
  }));


  useEffect(() => {
    if (todo && todo.data !== undefined) {
      dispatch({type: 'DELETE_TODO', id});
    }
  }, 
  [todo]);

  useEffect(() => {
    if (editTodo && editTodo.data) {
      dispatch({
        type: 'TOGGLE_TODO',
        id: editTodo.data.id,
        completeStatus: editTodo.data.completeStatus,
        completedDate: editTodo.data.completedDate,
      });
    }
  }, 
  [editTodo]);


  function handleDeleteTodo () {
	deleteTodo();
}

   function handleCheckedItem (evt) {
      let dateTimeHolder = null;

      if (evt.target.checked) {
        dateTimeHolder = Date.now();
      }
      else {
        dateTimeHolder = null;
      }
      toggleTodo({completeStatus: evt.target.checked, completedDate: dateTimeHolder})
   }


	//Updated from HW 3 with adding TOGGLE_TODO and DELETE_TODO
    return (
	    <div>
          <h3 style={{color: secondaryColor}}>Title: {title}</h3>
	          <br />
            <span> <input type="checkbox" checked={completeStatus} onChange={handleCheckedItem} /> </span>
	        <div>{description}</div>
	          <br />
			   <br />  
			   <button type="button" onClick={handleDeleteTodo}>Delete</button>
			   <hr/>
	          <br />   
	    </div>   )
}

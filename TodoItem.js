import React, {useContext, useEffect} from 'react'
import {useResource} from 'react-request-hook';
import {ThemeContext, StateContext} from './Contexts'

export default function TodoItem({title, description, completeStatus, completedDate, id}) {

    // Removed static completed items from HW 2
   // const dateCreated = new Date().toDateString();
   // const dateCompleted = new Date().toDateString();

   const {secondaryColor} = useContext(ThemeContext);
   const {dispatch} = useContext(StateContext);

   const [todo, deleteTodo] = useResource(() => ({
    url: `/todos/${id}`,
    method: 'delete',
  }));


  const [doneTodo, toggleTodo] = useResource(({completeStatus, completedDate}) => ({
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
    if (doneTodo && doneTodo.data) {
      dispatch({
        type: 'TOGGLE_TODO',
        id: doneTodo.data.id,
        completeStatus: doneTodo.data.completeStatus,
        completedDate: doneTodo.data.completedDate,
      });
    }
  }, 
  [doneTodo]);


  function handleDeleteTodo () {
	deleteTodo();
};

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
             <hr />
      <span>
        <input type="checkbox" checked={completeStatus} onChange={handleCheckedItem} />
        <b>Todo Item: {title}</b>
      </span>
      <p>
        <i>List:  {description}</i>
      </p>
        <p>The todo item created on: {new Date().toDateString()}</p>
         {completedDate && <p>Task completed on: {new Date(completedDate).toDateString()}</p>}
			   <button type="button" onClick={handleDeleteTodo}>Delete item</button>
	    </div>   )
}
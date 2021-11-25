import React, {useContext, useEffect} from 'react'
import {useResource} from 'react-request-hook';
import {ThemeContext, StateContext} from './Contexts'
import {Link} from 'react-navi'
import {Card, Button} from 'react-bootstrap'


function TodoItem({title, description, author, completeStatus, completedDate, todoId, short=false}) {

    // Removed static completed items from HW 2
   // const dateCreated = new Date().toDateString();
   // const dateCompleted = new Date().toDateString();

   const {secondaryColor} = useContext(ThemeContext);
   const {state, dispatch} = useContext(StateContext);

   const [deletedTodo, deleteTodo] = useResource((todoId) => ({
    url: `/todo/${todoId}`,
    method: 'delete',
    headers: {Authorization: `${state.user.access_token}`},
  }));


  const [toggledTodo, toggleTodo] = useResource((todoId, completed) => ({
    url: `/todo/${todoId}`,
    method: 'put',
    headers: {Authorization: `${state.user.access_token}`},
    data: {title, description, author, completeStatus:completed, completedDate: Date.now()
    }
  }));


  useEffect(() => {
    if (deletedTodo && deletedTodo.data && deletedTodo.isLoading === false) {
        dispatch({type: 'DELETE_TODO', todoId: todoId})
    }
}, [deletedTodo])

  useEffect(() => {
    if (toggledTodo && toggledTodo.data && toggledTodo.isLoading === false) {
        dispatch({type: 'TOGGLE_TODO', completeStatus:toggledTodo.data.completeStatus, completedDate:toggledTodo.data.completedDate, todoId})
    }
}, [toggledTodo])


let processedDescription = description

if (short) {
  if (description.length > 30) {
       processedDescription = description.substring(0, 30) + '...'
  }
}


/*
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
   */


	//Updated from HW 3 with adding TOGGLE_TODO and DELETE_TODO
    return (
      <Card>
          <Card.Body>
              <Card.Title><Link style={{color: secondaryColor}} href={`/todo/${todoId}`}>{title}</Link>
              </Card.Title>
              <Card.Subtitle>
              <i>Written by: <b>{author}</b></i>
              </Card.Subtitle>
              <Card.Text>
                  {processedDescription}
              </Card.Text>
              <input type="checkbox" checked={completeStatus} onChange={e => {toggleTodo(todoId, e.target.checked)}} />
               <Button variant="link" onClick={(e) => {deleteTodo(todoId)}}>Delete Todo Item</Button>
              {completeStatus && <i>Completed on: {new Date(completedDate).toLocaleDateString('en-us')}</i>}
              {short && <Link href={`/todo/${todoId}`}>View full todo item</Link>}
          </Card.Body>
          </Card>
 )
}

export default React.memo(TodoItem);
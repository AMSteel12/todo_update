import React from 'react'
import TodoItem from './TodoItem'
import {StateContext} from './Contexts'
import {useContext} from 'react/cjs/react.development'


export default function TodoList () { //({todos = []}) {
    const {state} = useContext(StateContext);
    const {todos} = state;

    return (
      <div>
	      {todos.map((todo) => (<TodoItem key={todo.id} {...todo} /> ))}
      </div>
    )
}
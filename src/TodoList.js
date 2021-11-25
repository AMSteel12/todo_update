import React, {useContext} from 'react'
import TodoItem from './TodoItem'
import {StateContext} from './Contexts'


export default function TodoList () {         //({todos = []}) {
    const {state} = useContext(StateContext);
    const {todos} = state;

    return (
      <div>
       {todos.map((t, i) => <TodoItem {...t} short={true} title={t.title} author={t.author} key={'todo-' + i} todoId={t.id}/>)}
      </div>
    )
}
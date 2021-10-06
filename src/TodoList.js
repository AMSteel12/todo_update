import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList ({todos = []}) {
    return (
      <div>
	 {todos.map((t, i) => <TodoItem {...t} key={'todo-' + i} />)}
      </div>
    )
}

import React from 'react'

export default function TodoItem({title, description, creator, complete}) {

    const dateCreated = new Date().toDateString();
    const dateCompleted = new Date().toDateString();

    return (
	    <div>
	        <h3>Title: {title}</h3>
	          <br />
	        <div>{description}</div>
	          <br />
			<div>Created by: {creator}</div>
			   <br />  
	        <i>Date created: </i>
	        	<br />
	        <div>{dateCreated}</div>
	          <br />
                <div>{complete}</div>
	          <br />
	        <i>Date completed: </i>
	        <div>{dateCompleted}</div>
	          <br />
	          <br />   
	    </div>   )
}

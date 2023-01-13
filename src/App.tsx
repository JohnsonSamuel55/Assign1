import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


function noRefresh(event){
  event.preventDefault();
}

export function App() {

  return (
    <div className="App">
      <form onSubmit={noRefresh}>
        <label for="Name">Name</label>
        <input type="text" id="Name" name="Name" /><br />
	    <input type="submit" value="Submit" />
      </form> 
    </div>
  )
}

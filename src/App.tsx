import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <form>
        <label for="fname">First name:</label><br>
        <input type="text" id="fname" name="fname"><br>
        <label for="lname">Last name:</label><br>
        <input type="text" id="lname" name="lname">
      </form> 
    </div>
  )
}

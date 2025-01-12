import { useState } from "react"
import Message from "./Message";

export default function Count(){
    const [count, setCount] = useState(0);
    const [incrementBy, setIncremently] = useState(1)
    function ButtonIncrese(){
        
      setCount(count + incrementBy)
    }
    function ButtonDecrease(){
      setCount(count - incrementBy)
    }
 /// creating a new increment 
  function increase_increment(){
  //// always add the first parameter
     setIncremently(incrementBy + 1)
  }
 ///// and also the decrement
 function decrease_increment(){
  setIncremently(incrementBy - 1)
 }

return(
    <div>
       <h1>Count is: {count}</h1> 
       <button onClick={ButtonIncrese}>Increment</button>
       <button onClick={ButtonDecrease}>Decrement</button>

      <h1>We are now incrementing all values by: {incrementBy}</h1>
      <button onClick={increase_increment}>The Increment value</button>
      <button onClick={decrease_increment}>The Decrement value</button>
    </div>
)

}
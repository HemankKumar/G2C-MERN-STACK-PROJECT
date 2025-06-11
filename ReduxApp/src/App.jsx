import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';

import { addItem,deleteItem,clearAllItems } from "./slice/Listslice";


function App() {
  const[item,setItem]=useState("");

  const dispatch=useDispatch();

  const addtask=()=>{
    alert(item);
    dispatch(addItem(item))
  }


  const mylist=useSelector((state)=>state.todolist.items)
  
  
  return (
    <>
      <h1>To Do List</h1>

      <div>
        <input type="text" onChange={(e)=>setItem(e.target.value)}/>{item}

        <button onClick={addtask}>Add Task</button>
        
      </div>

      <div>
        {
          mylist.map((item,index)=>{
            return(<div key={index}>
              <div>{item}</div>
              <button>Delete Task</button>
             </div> )
          })
        }
        
      </div>

      <button>clear All</button>
    </>
  )
}

export default App

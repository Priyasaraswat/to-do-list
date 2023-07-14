import React from 'react';
import { AiTwotoneEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import "./list.css"

const List = ( {id,task,setUpdateUI,updateMode}) => {
    const removeTask=()=>{
        axios.delete(`http://localhost:5000/api/v1/task/${id}`).then((res)=>{
            console.log(res);
            setUpdateUI((prev)=> !prev)
        })
    }
  return (
    <li className='task'>
        {task}
        <span className='iconHolder'>
          <AiTwotoneEdit  onClick={()=>updateMode(id,task)}/>
          <BsFillTrashFill onClick={removeTask}/>
        </span>
    </li>
  )
}

export default List
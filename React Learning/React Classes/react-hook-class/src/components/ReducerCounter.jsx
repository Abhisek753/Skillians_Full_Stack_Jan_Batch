import React, { useReducer } from 'react'

const counterReducer=(state,action)=>{
    switch (action.type){
        case "INCREMENT":
            return state+1;
        case "DECREMENT"  :
            return state-1;
        case "RESET" :
            return 0;
         default:
            return state;         
    }
}


const ReducerCounter = () => {
const [count,dispatch]=useReducer(counterReducer,0)


    const Increment=()=>{
      dispatch({type:"INCREMENT"})
    }
      const Decrement=()=>{
   dispatch({type:"DECREMENT"})
        
    }
      const Reset=()=>{
    dispatch({type:"RESET"})
        
    }
  return (
    <div className=' bg-amber-200 h-screen flex justify-center items-center text-center'>
       <div className='h-[200px] w-[400px] bg-white flex justify-between flex-col'>
         <div>
            <h1 className='text-5xl'>Counter App</h1>
        </div>
        <div className='items-center text-center'>
            <h2 className='text-4xl'>{count}</h2>
        </div>
        <div className='gap-4 flex items-center justify-center'>
            <button onClick={Increment}  className='py-2 px-4 bg-green-500 border text-white'>Increment</button>
            <button onClick={Decrement} className='py-2 px-4 bg-red-500 border text-white'>Decrement</button>
             <button onClick={Reset} className='py-2 px-4 bg-gray-500 border text-white'>Reset</button>
        </div>
       </div>
    </div>
  )
}

export default ReducerCounter
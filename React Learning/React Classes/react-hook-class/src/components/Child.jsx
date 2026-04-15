import React from 'react'

const Child = ({handleClick}) => {

    console.log("Child Component rendered");
  return (
    <div>
        <button className='bg-blue-500 text-white' onClick={handleClick}>Click from child</button>
    </div>
  )
}

export default React.memo(Child)
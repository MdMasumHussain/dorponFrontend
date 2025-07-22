import React from 'react'

async function Catagory({params}) {
  const {catagory} = await params 
  return (
    <>
      <div className="mt-18">
        <h1>the product name is {catagory}</h1>
      </div>
    </>
  )
}

export default Catagory
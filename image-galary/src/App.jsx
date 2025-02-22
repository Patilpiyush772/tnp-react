import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { use } from 'react'
import { useEffect } from 'react'
const App = () => {
  const  [imgdata,setimg] = useState('')

  console.log(imgdata)
const fetch = async ()=>{
let img = await axios.get('https://picsum.photos/v2/list?limit=10')
setimg(img.data)
}
useEffect(()=>{
  fetch()
},[])

  return (
    <div>
      <div>
        <input type="text" placeholder='enter image limit' />
      </div>
      <div>
       <h1>images</h1> 
      </div>
    </div>
  )
}

export default App

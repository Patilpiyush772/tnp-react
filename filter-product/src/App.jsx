import React, { useState } from 'react'
import data from './db/data.json'
const App = () => {
  const [product, setProducts] = useState(data.data.items)
 const [fildata, setFildata] = useState(...product)
  return (
    <div>
hello hi dosto
    </div>
  )
}
  
export default App

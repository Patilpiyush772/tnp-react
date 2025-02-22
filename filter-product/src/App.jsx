import React, { useState } from 'react'
import data from './db/data.json'
import { useEffect } from 'react'
const App = () => {
  const [product, setProducts] = useState(data.data.items)
 const [fildata, setFildata] = useState(product)
const [search, setSearch] = useState('')
const [category, setCategory] = useState('')
const [price, setPrice] = useState('')

const filter = ()=>{
  let newdata  =fildata.filter((elem)=>{
    return (
      (search ? elem.name.toLowerCase().includes(search.toLowerCase()) : true) &&
    (category ? elem.category.toLowerCase().includes(category.toLowerCase()) : true) &&
    (price ? Number(elem.price) <=Number(price) : true)
    )
  })
  console.log(newdata)
  setFildata(newdata)
}
useEffect(()=>{
filter()
},[search,category,price])
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div className="col-span-full mb-4">
        <input type="text" placeholder='search' value={search} onInput={(e)=>setSearch(e.target.value)} className="p-2 border rounded mr-2" />
        <input type="text" placeholder='category'  onInput={(e)=>setCategory(e.target.value)}  className="p-2 border rounded mr-2" />
        <input type="text" placeholder='price'  onInput={(e)=>setPrice(e.target.value)}  className="p-2 border rounded" />
      </div>
      {fildata.map((elem) => (
        <div
          key={elem.id}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{elem.name}</h1>
          <p className="text-gray-600 mb-4">{elem.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-green-600">${elem.price}</span>
            <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full">
              {elem.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
  
export default App

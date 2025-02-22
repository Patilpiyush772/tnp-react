import React, { useState, useEffect } from 'react';
import data from './db/data.json';

const App = () => {
  const [products] = useState(data.data.items); // products एक बार लोड होते हैं
  const [fildata, setFildata] = useState(...products);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const filter = () => {
    const newdata = products.filter((item) => {
      const searchMatch = search
        ? item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
        : true;

      const categoryMatch = category ? item.category === category : true;
      const priceMatch = price ? Number(item.price) <= Number(price) : true;

      return searchMatch && categoryMatch && priceMatch;
    });

    setFildata(newdata);
  };

  useEffect(() => {
    filter();
  }, [search, category, price, products]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div className="col-span-full mb-4">
        <input
          type="text"
          placeholder="Search by name, description, or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded mr-2"
        >
          <option value="">All Categories</option>
          {[...new Set(products.map((item) => item.category))].map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Max price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {fildata.length > 0 ? (
        fildata.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h1>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-green-600">${item.price}</span>
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full">
                {item.category}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default App;

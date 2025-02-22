import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler); // Cleanup on value change
  }, [value, delay]);
  
  return debouncedValue;
};

const App = () => {
  const [imgData, setImgData] = useState([]);
  const [limit, setLimit] = useState('');
  const [loading,setloding] = useState()
  
  // Debounced limit
  const debouncedLimit = useDebounce(limit, 500); // 500ms डिले

  useEffect(() => {
    const fetchImages = async () => {
      if (debouncedLimit) {
        setloding(true)
        try {
          const response = await axios.get(`https://picsum.photos/v2/list?limit=${debouncedLimit}`);
          setImgData(response.data);
          setloding(false)
console.log(imgData)
        } catch (error) {
          console.error('Error fetching images:', error);
          setloding(false)
        }
      }
    };
console.log(debouncedLimit)
    fetchImages();
  }, [debouncedLimit]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter image limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <h1 className="text-2xl font-bold mb-4">Images</h1>
      {loading &&  <p className="text-blue-500">Loading images...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
        imgData.length ?(

          imgData.map((item) => (
            <div key={item.id} className="border p-4 rounded">
            <h1 className="text-lg font-semibold mb-2">{item.author}</h1>
            <img src={item.download_url} alt={item.author} className="w-full h-auto" />
          </div>
        ))
        ):(
          !loading && <p className="text-blue-500">No images found.</p>
        )
      }
      
      </div>
    </div>
  );
};

export default App;

import Routes from "./Routes";
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Adjust path as needed

function App() {
  return (
    <Routes />
  );
}



function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // 'products' is the name of the table you created in Step 1
      let { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name} - ${product.price}</div>
      ))}
    </div>
  );
}

export default App;




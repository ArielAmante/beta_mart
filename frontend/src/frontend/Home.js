import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductList from './ProductList'; // Adjust the path as needed

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let result = await fetch('http://127.0.0.1:8000/api/');
      result = await result.json();
      setData(result);
    };

    fetchData();
  }, []);

  const user = JSON.parse(localStorage.getItem('user-info'));
  const userId = user ? user.id : '';

  async function addToCart(product) {
    if (!userId) {
      navigate('/login');
      return;
    }

    let item = { userId, productId: product.id, qty: 1 }; // Assuming default quantity as 1 for homepage
    let result = await fetch("http://127.0.0.1:8000/api/add_to_cart", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(item)
    });
    result = await result.json();
    console.log(result);
  }

  return (
    <>
      <header className="py-5" style={{ backgroundColor: '#3cd2f0' }}>
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">Your One-stop shop for school and office needs!!</p>
          </div>
        </div>
      </header>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <ProductList addToCart={addToCart} />
        </div>
      </section>
    </>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Search({ searchData }) {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredData = searchData.filter(item => 
    item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.description.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      {console.log(searchData)}
      {/* search input section */}
      <div className="col-8 m-auto mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for products..."
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>

      {/* search result section */}
      <div className="col-8 m-auto veiw-h">
        <h3 className="mt-3 text-center">Items Found Against Your Search</h3>
        {filteredData.map((item) =>
          <div key={item.id} className="card my-3 m-auto" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={"http://127.0.0.1:8000/storage/gallery/" + item.gallery} className="img-fluid rounded-start" alt="product pic" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <Link to={"/product/" + item.id} className="text-decoration-none underline">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description.slice(0, 75)}...</p>
                  </Link>
                  <p className="card-text"><small className="text-danger">₱ {item.price}</small></p>
                </div>
              </div>
            </div>
          </div>
        )}
        {!filteredData.length && <div className="text-danger fs-4 text-center">Sorry, No result found!!</div>}
      </div>
    </>
  );
}

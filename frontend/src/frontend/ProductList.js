import React from 'react';
import yellowPad from '../assets/img/yellow_pad.jpg';
import scissors from '../assets/img/scissors.jpg';
import longBondPaper from '../assets/img/long_bond_paper.jpg';
import shortBondPaper from '../assets/img/short_bond_paper.jpg';
import blackBallpen from '../assets/img/black_ballpen.jpg';
import blueBallpen from '../assets/img/blue_ballpen.jpg';
import highlighter from '../assets/img/highlighter.jpg';
import assortedCartolina from '../assets/img/assorted_cartolina.jpg';
import assortedArtPaper from '../assets/img/assorted_art_paper.jpg';
import plasticCover from '../assets/img/plastic_cover.jpg';
import pencilSharpener from '../assets/img/pencil_sharpener.jpg';
import calculator from '../assets/img/calculator.jpg';

const ProductList = ({ addToCart }) => {
  const products = [
    { id: 1, name: 'Yellow Pad Paper', description: '1 pad', price: 26, image: yellowPad },
    { id: 2, name: '1 pair of Scissors', description: 'HBW', price: 13, image: scissors },
    { id: 3, name: 'Long Bond Paper', description: 'Orion', price: 30, image: longBondPaper },
    { id: 4, name: 'Short Bond Paper', description: 'Orion', price: 28, image: shortBondPaper },
    { id: 5, name: '1 pc Black Ballpen', description: 'G-Tech', price: 65, image: blackBallpen },
    { id: 6, name: '1 pc. Blue Ballpen', description: 'Panda', price: 8, image: blueBallpen },
    { id: 7, name: '1 pc Highlighter', description: 'Yellow', price: 26, image: highlighter },
    { id: 8, name: 'Assorted Cartolina', description: 'with border', price: 13, image: assortedCartolina },
    { id: 9, name: 'Assorted Art Paper', description: '1 rim', price: 11, image: assortedArtPaper },
    { id: 10, name: 'Clear Plastic Cover', description: '2ft', price: 16, image: plasticCover },
    { id: 11, name: 'Pencil Sharpener', description: 'Manual', price: 3, image: pencilSharpener },
    { id: 12, name: 'Scientific Calculator', description: 'Scientific', price: 50, image: calculator }
  ];

  return (
    <div className="product-list-container">
      <h2 className="h2eto">PRODUCTS</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <div className="product-details">
              <img src={product.image} alt={product.name} className="product-image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              <h3 className="product-name text-center">{product.name}</h3>
              <p className="product-price">₱ {product.price}</p>
              <button onClick={() => addToCart(product)} className="add-to-cart-button">Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;

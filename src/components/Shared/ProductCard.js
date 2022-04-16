import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import "./productCard.scss";

const Product = ({ product, id }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,.2)",
    activeColor: "crimson",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>

      <div>
        <ReactStars {...options} />{" "}
        <span>
          {" "}
          ({product.numOfReviews > 0 ? product.numOfReviews : "No"}{" "}
          {product.numOfReviews === 1 ? "Review" : "Reviews"} ){" "}
        </span>
      </div>

      <span>$ {product.price}</span>
    </Link>
  );
};

export default Product;
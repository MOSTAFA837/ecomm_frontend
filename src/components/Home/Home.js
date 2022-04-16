import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import ProductCard from "../Shared/ProductCard";
import MetaData from "../Layout/MetaData";
import "./Home.scss";
import { getProduct } from "../../actions/productActions";
import Loader from "../Layout/Loader/Loader";
import Slider from "./Slider";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <Slider />

          <div className="home">
            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

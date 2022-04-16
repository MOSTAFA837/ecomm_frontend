import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "./Header.scss";

const navLinks = ["home", "products", "contact", "about"];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <Link to="/">
            <h1>ecommerce</h1>
          </Link>
        </div>

        <ul className="app__navbar-links">
          {navLinks.map((item) => (
            <li className="app__flex p-text" key={`link-${item}`}>
              <a href={`${item === "home" ? "/" : `/${item}`} `}>{item}</a>
            </li>
          ))}
        </ul>

        <div className="app__navbar-icons">
          <Link to="/search" className="icon">
            <AiOutlineSearch />
          </Link>
          <Link to="/cart" className="icon">
            <AiOutlineShoppingCart />
          </Link>
          <Link to="/login" className="icon">
            <ImProfile />
          </Link>
        </div>

        <div className="app__navbar-menu">
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
            <motion.div
              className="wrapper"
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <HiX onClick={() => setToggle(false)} />

              <ul>
                {navLinks.map((item) => (
                  <li key={item}>
                    <a
                      href={`${item === "home" ? "/" : `/${item}`} `}
                      onClick={() => setToggle(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="menu-icons">
                <Link
                  to="/search"
                  className="icon"
                  onClick={() => setToggle(false)}
                >
                  <AiOutlineSearch />
                </Link>
                <Link
                  to="/cart"
                  className="icon"
                  onClick={() => setToggle(false)}
                >
                  <AiOutlineShoppingCart />
                </Link>
                <Link
                  to="/login"
                  className="icon"
                  onClick={() => setToggle(false)}
                >
                  <ImProfile />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import SliderContent from "./SliderContent";

import imageSlider from "./data";
import Dots from "./Dots";
import "./slide.scss";

const len = imageSlider.length - 1;


const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    // <div className={`slider-container `} style={{ backgroundColor: imageSlider[activeIndex].backGround , transition: "all 2s"}}>
    <div className={`slider-container `}>
      <SliderContent activeIndex={activeIndex} imageSlider={imageSlider} />

      <Dots
        activeIndex={activeIndex}
        imageSlider={imageSlider}
        onClick={(activeIndex) => setActiveIndex(activeIndex)}
      />
    </div>
  );
};

export default Slider;

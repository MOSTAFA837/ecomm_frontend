import React from "react";

const SliderContent = ({ activeIndex, imageSlider }) => {
  return (
    <section>
      {imageSlider.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          <img src={slide.imgUrl} className="slide-image" alt="" />
          <div className="text-container">
            <h2 className="slide-title">{slide.title}</h2>
            <h3 className="buyNow">Buy Now</h3>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SliderContent;

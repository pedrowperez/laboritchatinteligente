import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/style/Onboarding.css';
import robotImage1 from '../../assets/img/RobotImage.png';
import robotImage2 from '../../assets/img/RobotImage.png'; 
import robotImage3 from '../../assets/img/RobotImage.png'; 
import imgArrow from '../../assets/img/onboarding/Line.svg'; 

const Onboarding = ({ onComplete }) => {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      afterChange: (current) => setCurrentSlide(current),
    };
  
    const handleNext = () => {
      if (currentSlide === 2) {
        onComplete();
      } else {
        sliderRef.current.slickNext();
      }
    };
  
    return (
      <div className="onboarding-container">
        <button className="skip-button" onClick={onComplete}>Skip</button>
        <Slider ref={sliderRef} {...settings} className="slider">
          <div className="slide">
            <div className="image-container">
              <img src={robotImage1} alt="AI Robot" className="robot-image" />
            </div>
            <h1>Unlock the Power Of Future AI</h1>
            <p>Chat with the smartest AI Future<br />Experience power of AI with us</p>
          </div>
          <div className="slide">
            <div className="image-container">
              <img src={robotImage2} alt="AI Robot" className="robot-image" />
            </div>
            <h1>Explore Advanced AI Technologies</h1>
            <p>Discover the capabilities of modern AI<br />and how it can help you in daily tasks</p>
          </div>
          <div className="slide">
            <div className="image-container">
              <img src={robotImage3} alt="AI Robot" className="robot-image" />
            </div>
            <h1>Join the Future Today</h1>
            <p>Be part of the AI revolution<br />and shape the future with us</p>
          </div>
        </Slider>
        <div className="navigation-buttons">
          <button
            className="prev-button"
            onClick={() => sliderRef.current.slickPrev()}
            disabled={currentSlide === 0}
          >
            <img src={imgArrow} alt="Seta" />
          </button>
          <button className="next-button" onClick={handleNext}>
            {currentSlide === 2 ? 'Finish' : <img src={imgArrow} alt="Seta" />}
          </button>
        </div>
      </div>
    );
  };
  
  export default Onboarding;
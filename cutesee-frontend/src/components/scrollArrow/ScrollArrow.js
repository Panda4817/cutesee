import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import './ScrollArrow.css';

const ScrollArrow = () =>{

    const [showScroll, setShowScroll] = useState(false)
  
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400){
        setShowScroll(true)
      } else if (showScroll && window.pageYOffset <= 400){
        setShowScroll(false)
      }
    };
  
    const scrollTop = () =>{
      window.scrollTo({top: 0, behavior: 'smooth'});
    };
  
    window.addEventListener('scroll', checkScrollTop)
  
    return (
        <FontAwesomeIcon 
            icon={faChevronCircleUp} 
            className="scrollTop" 
            onClick={scrollTop} 
            style={{ display: showScroll ? 'block' : 'none'}}
        />
    );
  }
  
  export default ScrollArrow;
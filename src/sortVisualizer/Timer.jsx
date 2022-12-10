import React, { useState, useEffect } from 'react';
import './timer.css';
import "./SortVisualizer.css";

export const Timer = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
  
    function toggle() {
      setIsActive(!isActive);
    }
  
    function reset() {
      setSeconds(0);
      setIsActive(false);
    }
  
    useEffect(() => {
      let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, seconds]);
  
    return (
      <div className="app-footer">
        <div className="time">
          {seconds}s
        </div>
        <div className="row">
          <button className={`button app-button -${isActive ? 'active' : 'inactive'}`} onClick={() => { toggle(); props.toggle  }} >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button className="button app-button" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    );
}



import {useState, useEffect} from 'react';

// This hook is to help handle long holds over a element where it allows repeating actions of the function applied.

export function useHoldPress(callback = () => {}, ms = 60) {
    const [startHoldPress, setStartHoldPress] = useState(false);
  
    useEffect(() => {
      let timerId;
      let timerDelay;
      callback;
      if (startHoldPress) {
          // TimerDelay is to nicely delay the auto repeat of values.
          timerDelay = setTimeout(() => {
            // Speed of how often the callback/applied function is repeated.
            timerId = setInterval(callback, ms);
        }, 200)
      } else {
        clearTimeout(timerId);
      }
  
      return () => {
        clearTimeout(timerId);
        clearTimeout(timerDelay);
      };
    }, [startHoldPress]);
  
    return {
      onMouseDown: (e) => {
            setStartHoldPress(true)
            e.preventDefault(); // To prevent catching of dragging items with mouse.
        },
      onMouseUp: () => setStartHoldPress(false),
      onMouseLeave: () => setStartHoldPress(false),
      onTouchStart: () => setStartHoldPress(true),
      onTouchEnd: () => setStartHoldPress(false),
      onClick: () => callback() // To handle single clicks.
    };
  }
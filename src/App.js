import React, {useState, useEffect} from 'react';
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import DisplayComponent from './Components/Display';
import BtnComponent from './Components/Btn';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);
  const [status, setStatus] = useState(0);
// not started = 0
// started = 1
// paused = 2
useEffect(() => {
  const unsubscribe = new Subject();
  interval(1000)
    .pipe(takeUntil(unsubscribe))
    .subscribe(() => {
      if(watchOn) {
        setTime(val => val + 1)
      }
    })

    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    }
}, [watchOn]);
const handleStart = () => {
  setWatchOn(prevState => !prevState);
  setStatus(1);
}
const handleResume = () => {
  handleStart();
}

const handleWait = () => {
  if(time !== 0) {
    setWatchOn(false)
  }
  setStatus(2);
}

const handleReset = () => {
  handleStop();
  handleStart();
}

const handleStop = () => {
  setTime(0);
  setWatchOn(false);
  setStatus(0);
}

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponent time = {time} />
          <BtnComponent 
            status= {status} 
            reset = {handleReset} 
            wait = {handleWait} 
            resume = {handleResume} 
            start= {handleStart}
            stop= {handleStop}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

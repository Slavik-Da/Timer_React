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
  setTime(0);
  setWatchOn(false);
  setStatus(0);
}
 /*
  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 1000))
  }
  var updatedS = time.s, 
      updatedM = time.m,
      updatedH = time.h;
  
  const run = () => {
    if(updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    return setTime({s:updatedS, m:updatedM, h:updatedH});
  }

  const stop = () => {
    clearInterval(interv)
    setStatus(2);
  }
  const reset = () => {
    clearInterval(interv)
    setStatus(0);
    setTime({s:0, m:0, h:0});
  }

  const resume = () => start()
 */

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
          />
        </div>
      </div>
    </div>
  );
}

export default App;

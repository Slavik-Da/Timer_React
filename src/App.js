import React, {useState} from 'react';
import DisplayComponent from './Components/DisplayComponent';
import BtnComponent from './Components/BtnComponent';
import './App.css';

function App() {
  const [time, setTime] = useState({s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
// not started = 0
// started = 1
// paused = 2

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


  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponent time = {time} />
          <BtnComponent status= {status} reset = {reset} stop = {stop} resume = {resume} start= {start}/>
        </div>
      </div>
    </div>
  );
}

export default App;

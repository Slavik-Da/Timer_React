import React from 'react'

function Btn({ start, stop, wait, reset, resume, status}) {
// not started = 0
// started = 1
// paused = 2
  return (
    <div>
        {(status === 0)?
         <button className="stopwatch-btn stopwatch-btn-gre"
         onClick={start}>Start</button> : ''
        }
     
    {(status === 1)?
        <div>
            <button className="stopwatch-btn stopwatch-btn-red"
                onClick={stop}>Stop</button>
            <button className="stopwatch-btn stopwatch-btn-red"
                onClick={wait}>Wait</button>
            <button className="stopwatch-btn stopwatch-btn-yel"
                onClick={reset}>Reset</button>
        </div> : ''
    }

    {(status === 2)?
        <div>
            <button className="stopwatch-btn stopwatch-btn-gre"
                onClick={resume}>Resume</button>
            <button className="stopwatch-btn stopwatch-btn-yel"
                onClick={reset}>Reset</button>
        </div> : ''
    }
         
    </div>
  );
}

export default Btn;

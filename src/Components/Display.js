import React from 'react'


function Display({time}) {

  return (
    <div>
      <span>{('0' + Math.floor((time / (10 * 60 * 60)) % 24)).slice(-2)}</span>&nbsp;:&nbsp;
      <span>{('0' + Math.floor(time / 60)).slice(-2)}</span>&nbsp;:&nbsp;
      <span>{('0' + Math.floor((time / 1) % 60)).slice(-2)}</span>&nbsp;&nbsp;
    </div>
  );
}

export default Display;

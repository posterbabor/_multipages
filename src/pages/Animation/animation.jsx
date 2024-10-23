import React, { useState, useEffect } from 'react';
import './animation.css';

const BallApp = () => {
  const [running, setRunning] = useState(false);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [ballDiameter, setBallDiameter] = useState(100);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const fieldWidth = 760;
  const fieldHeight = 400;
  const vx = 5;
  const vy = 5;
  const maxLeft = fieldWidth - ballDiameter - 6;
  const maxTop = fieldHeight - ballDiameter - 6;

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        calculatePosition();
      }
    }, 25);
    return () => clearInterval(interval);
  }, [running, left, top, goRight, goDown, ballDiameter, speedMultiplier]);

  const calculatePosition = () => {
    let newLeft = left;
    let newTop = top;
    let adjustedVx = vx * speedMultiplier;
    let adjustedVy = vy * speedMultiplier;

    if (goRight) {
      newLeft += adjustedVx;
      if (newLeft >= maxLeft) setGoRight(false);
    } else {
      newLeft -= adjustedVx;
      if (newLeft <= 0) setGoRight(true);
    }

    if (goDown) {
      newTop += adjustedVy;
      if (newTop >= maxTop) setGoDown(false);
    } else {
      newTop -= adjustedVy;
      if (newTop <= 0) setGoDown(true);
    }

    setLeft(newLeft);
    setTop(newTop);
  };

  const toggleRun = () => setRunning(!running);

  const changeBallImage = (image) => {
    const ball = document.getElementById('ball');
    if (image) {
      ball.style.backgroundImage = `url(${image})`;
    } else {
      ball.style.backgroundImage = '';  // หากเป็น NONE ให้ลบรูปออก
    }
  };

  return (
    <div id="container">
      <div id="field" style={{ width: fieldWidth, height: fieldHeight, position: 'relative', overflow: 'hidden' }}>
        <div
          id="ball"
          className={running ? 'spin' : ''}
          style={{
            width: ballDiameter,
            height: ballDiameter,
            left: left,
            top: top,
            position: 'absolute',
          }}
        ></div>
      </div>
      <div id="control">
        <button onClick={toggleRun} className={`btn ${running ? 'btn-danger' : 'btn-success'}`}>
          {running ? 'PAUSE' : 'RUN'}
        </button>
        <button onClick={() => changeBallImage('')} className="btn btn-primary">NONE</button>
        <button onClick={() => changeBallImage('./bas.jpg')} className="btn btn-primary">BASKETBALL</button>
        <button onClick={() => changeBallImage('./football.jpg')} className="btn btn-primary">FOOTBALL</button>
        <button onClick={() => changeBallImage('./vplleyball.jpg')} className="btn btn-primary">VOLLEYBALL</button>
        <button onClick={() => changeBallImage('./241799429_1656368757893440_7308901390649138932_n.jpg')} className="btn btn-primary">HUMAN</button>
        <button onClick={() => changeBallImage('./cartoon.jpg')} className="btn btn-primary">CARTOON</button>
        <button onClick={() => changeBallImage('./logo.png')} className="btn btn-primary">LOGO</button>
      </div>
    </div>
  );
};

export default BallApp;

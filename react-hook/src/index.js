import './style.scss';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function ChangeName({ setName }) {
  let input;

  let handeChange = () => {
    setName(input.value);
  };

  return <div>
    <input type="text" ref={node => input = node} onChange={ handeChange } />
  </div>
}

function App() {
  const [name, setName] = useState('World');
  const [time, setTime] = useState({ now: new Date() })

  useEffect(() => {
    let interval = setInterval(() => {
      console.log(time);
      setTime({ now: new Date() });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  return <div>
    <h1>Hello {name}, Time is { time.now.getSeconds() }</h1>
    <ChangeName setName={ setName } time={ time }></ChangeName>
  </div>;
}

ReactDOM.render(<App />, document.getElementById('root'));

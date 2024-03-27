import './App.css';
import { useState, useEffect } from 'react';


const useCounter = (defaultValue) => {
  const [counter, setCounter] = useState(defaultValue);

  const incCounter = () => {
    if (counter < 50) {
      setCounter(counter => counter + 1)
    }
  }

  const decCounter = () => {
    if (counter > -50) {
      setCounter(counter => counter - 1)
    }
  }

  const rndCounter = async () => {
    await fetch('https://www.random.org/integers/?num=1&min=-50&max=50&col=5&base=10&format=plain&rnd=new')
      .then(res => res.text())
      .then(setCounter)
      .catch(err => console.log(err))
  }

  const resetCounter = () => {
    setCounter(defaultValue)
  }

  return {
    counter,
    incCounter,
    decCounter,
    rndCounter,
    resetCounter
  }
}

const Counter = (props) => {
  const { counter, incCounter, decCounter, rndCounter, resetCounter } = useCounter(props.counter);

  return (
    <div className="component">
      <div className="counter">{counter}</div>
      <div className="controls">
        <button onClick={incCounter}>INC</button>
        <button onClick={decCounter}>DEC</button>
        <button onClick={rndCounter}>RND</button>
        <button onClick={resetCounter}>RESET</button>
      </div>
    </div>
  )
}

const RndCounter = (props) => {
  const { counter, rndCounter, resetCounter } = useCounter(props.counter);

  useEffect(() => {
    rndCounter()
  }, [])

  return (
    <div className="component">
      <div className="counter">{counter}</div>
      <div className="controls">
        <button onClick={rndCounter}>RND</button>
        <button onClick={resetCounter}>RESET</button>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <>
      <Counter counter={0} />
      <RndCounter counter={5} />
    </>
  )
}

export default App;

import { useState } from 'react'
import './App.css'

function App() {
  const [output, setOutput] = useState("")
  const [history,setHistory] = useState('')
  const operands = "+-*/"
  function handleClick(e) {
    let newInput = e.target.value
    if (e.target.getAttribute('type') === 'operand') {
      setOutput(prevOutput => {
        if (prevOutput[prevOutput.length - 1] == '.') return prevOutput + '0' + newInput
        else if (prevOutput.length === 0) {
          if (newInput === '/' || newInput === '*' || newInput === '+')
            return prevOutput
          else
            return prevOutput + '-'
        }
        else if (operands.includes(prevOutput[prevOutput.length - 1])) {
          if (prevOutput.length == 1) return prevOutput
          return prevOutput.slice(0, -1) + newInput
        }
        else {
          return prevOutput + newInput
        }
      })
    }
    else {
      setOutput(prevOutput => {
        if (newInput === '.' && (prevOutput.length === 0 || operands.includes(prevOutput[prevOutput.length - 1])))
          return prevOutput + '0' + newInput
        else
          return prevOutput + newInput
      }
      )
    }
  }
  function clear() {
    setHistory("")
    setOutput("")
  }
  function backClear() {
    setOutput(prevOutput => prevOutput.slice(0, prevOutput.length - 1))
  }
  function result() {
    try {
      setHistory(output)
      const result = eval(output);

      setOutput(result.toString());
    } catch (error) {
      setOutput(error);
    }

  }
  return (
    <>
      <div className='calculator'>
        <div className='output'>
          <div className='prev-output'>{history}</div>
          <div className='current-output'>{output}</div>
        </div>
        <button onClick={clear} className='span-two'>AC</button>
        <button onClick={backClear}>C</button>
        <button value='/' type="operand" onClick={handleClick}>&divide;</button>
        <button value='9' type="number" onClick={handleClick}>9</button>
        <button value='8' type="number" onClick={handleClick}>8</button>
        <button value='7' type="number" onClick={handleClick}>7</button>
        <button value='-' type="operand" onClick={handleClick}>-</button>
        <button value='6' type="number" onClick={handleClick}>6</button>
        <button value='5' type="number" onClick={handleClick}>5</button>
        <button value='4' type="number" onClick={handleClick}>4</button>
        <button value='+' type="operand" onClick={handleClick}>+</button>
        <button value='3' type="number" onClick={handleClick}>3</button>
        <button value='2' type="number" onClick={handleClick}>2</button>
        <button value='1' type="number" onClick={handleClick}>1</button>
        <button value='*' type="operand" onClick={handleClick}>&times;</button>
        <button value='.' type="number" onClick={handleClick}>.</button>
        <button value='0' type="number" onClick={handleClick}>0</button>
        <button className='span-two' onClick={result}>=</button>
      </div>
    </>
  )
}

export default App

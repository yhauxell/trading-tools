import { useState } from 'react'
import './App.css'
import { PositionSize } from './components/PositionSize'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-green-100' onClick={()=> setCount((prev)=> prev++)}>
      <PositionSize />
      <span>{count}</span>
    </div>
  )
}

export default App

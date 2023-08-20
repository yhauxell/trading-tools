import { useState } from 'react'
import './App.css'
import { PositionSize } from './components/PositionSize'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div onClick={()=> setCount((prev)=> prev++)}>
      <PositionSize />
    </div>
  )
}

export default App

import { useState, useEffect, use } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  let getData = async ()=>{
    let response = await fetch('http://127.0.0.1:5000/')
    let data = await response.json()
    console.log(data[0].username)
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
    </>
  )
}

export default App
import React from 'react'
import 'react-connect-rx/dist/index.css'
import StopWatch from "./components/StopWatch.tsx";

const App = () => {
  return (
    <>
      <h1>Examples</h1>
      <div>
        <h2>Analog stop watch example</h2>
        <StopWatch count={0}/>
      </div>
    </>
  )
}

export default App

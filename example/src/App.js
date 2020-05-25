import React from 'react'
import 'react-connect-rx/dist/index.css'
import StopWatchExamples from "./components/StopWatch";
import SimleCounter from "./components/SimpleCounter"

const App = () => {
  return (
    <>
      <h1>Examples</h1>
      <SimleCounter />
      <hr />
      <StopWatchExamples />
    </>
  )
}

export default App

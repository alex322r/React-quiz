
import { useState } from 'react'
import './App.css'
import IntroPage from './components/IntroPage'
import { QuestionPage } from './components/QuestionPage'
import { useEffect } from 'react'
// import datos from './mocks/questions.json'

function App() {

  const [startQuiz, setStartQuiz] = useState(false)


  return (
    <> 
    {startQuiz ? <QuestionPage /> : <IntroPage setStartQuiz={setStartQuiz} />}
    </>
  )
}

export default App

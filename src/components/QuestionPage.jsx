/* eslint-disable react/prop-types */
import {v4 as uuid4} from 'uuid'
import { useState } from 'react'
import { useEffect } from 'react'
import ScoreBar from './ScoreBar'
import Confetti from 'react-confetti'
import Question from './Question'
import ReactLoading from 'react-loading';
import Modal from 'react-modal';


const QUESTIONS_NUMBER = 5;

export function QuestionPage() {

    const customStyles = {
        content: {
            width: '30%', 
            height: '20%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Inter',
            fontSize: '20px',
            textAlign: 'center'
        }
      }

    let subtitle;
    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }

    Modal.setAppElement('#root');
    const [modalIsOpen, setIsOpen] = useState(false)

    const [score, setScore] = useState(0) 
    const [isOver, setIsOver] = useState(false)  
    const [allAnswers, setAllAnswers] = useState([]) 
    const [selectAnswers, setSelectAnswers] = useState([])
    const [isCorrect, setIsCorrect] = useState(Array(5).fill(false))
    const [questions, setQuestions] = useState(null)
    const [correct_answers, setCorrectAnswers] = useState([])
  
  useEffect(()=> {
    if(isOver) return;    
    fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy').then(res => res.json()).then(data  => setQuestions(data.results))
    
    console.log("fetching api...")


    },[isOver])
    
    const newGame = () => {
        setScore(0)
        setIsOver(false)
        setAllAnswers([])
        setSelectAnswers([])
        setIsCorrect(Array(5).fill(false))
        setCorrectAnswers([])
        setQuestions(null)
    }


    useEffect(()=>{
        if(!questions) return
        console.log("calculating data")
        const allAnswers = () => {
            const answersArr = []
            
            for(let i = 0; i<questions?.length; i++) {
                const answers = [...questions[i].incorrect_answers]
                const randomIndex = Math.floor(Math.random() * (answers.length + 1))
                answers.splice(randomIndex, 0, questions[i].correct_answer)
                answersArr.push({name: uuid4(), answers})
            }
            return answersArr   
        } 
        setAllAnswers(allAnswers())
        setCorrectAnswers(questions?.map(question => question.correct_answer))

    },[questions])

    
    const checkAnswers = (answers) => {
        for(let i = 0; i<answers.length; i++){
            if(answers[i]===correct_answers[i]){
                setScore(prev => prev+1)
                setIsCorrect(prev => {
                   const newIsCorrect = [...prev]
                   newIsCorrect[i] = true
                   return newIsCorrect
                })
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const nodeAnsers = form.querySelectorAll(`input:checked`)
        if(nodeAnsers.length<QUESTIONS_NUMBER) {
            openModal()
            return
        }
        const selectAnswers = [...nodeAnsers].map(selectAnswer => selectAnswer.value)
        setSelectAnswers(selectAnswers)
        checkAnswers(selectAnswers)
        setIsOver(true)
    }   

    return(
        
        <>
        <main className="question-page">
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Answer all!"
        >Answer all!</Modal>
        {   
        questions ?
            <form onSubmit={e => handleSubmit(e)} id='quiz-form' className="question-form">
            <Question isCorrect={isCorrect} isOver={isOver} selectAnswers={selectAnswers} allAnswers={allAnswers} correct_answers={correct_answers} questions={questions} />
            {           
            isOver ? <ScoreBar newGame={newGame} score={score}/ > : <button form='quiz-form' type='submit' className="check-answers-btn" >Check Answers</button>   
            }
            </form> 
            : <ReactLoading type='spin' className='loading' color='#D6DBF5'/>  
        }
        </main>
        {isOver && score===5 && <Confetti /> }
        </>
        
    )
}
import Answers from './Answers'
import he from 'he'
import {v4 as uuid4} from 'uuid'

export default function Question({questions, allAnswers ,selectAnswers, correct_answers, isCorrect, isOver}) {

    return (
        <>
            {
            
            questions?.map((question, i) => (
                <div key={uuid4()} className='question-divider'>
                    <p className='question-title'>{he.decode(question.question)}</p>
                    <Answers selectAnswer={selectAnswers[i]} correctAnswer={correct_answers[i]} isCorrect={isCorrect[i]} isOver={isOver} allAnswers={allAnswers[i]}/>
                </div>                
            ))
            
            }   
        </>
    )
}
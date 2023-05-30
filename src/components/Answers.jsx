import {v4 as uuid4} from 'uuid'
import he from 'he'

export default function Answers ({allAnswers, isOver, correctAnswer, selectAnswer}) {
    
    const correctStyle = {background: '#94D7A2', border : 'none'}
    const wrongStyle = {background: '#F8BCBC', border : 'none',}
    return (
        <div className='answers-wraper'>
            {
                allAnswers?.answers.map(answer => {
                    const inputId = uuid4()
                    const labelId = uuid4()
                    return (
                        <div key={uuid4()} className='answers-wraper'>
                            <input disabled={isOver} id={inputId} value={answer} type="radio" name={allAnswers.name} />
                            <label style={ isOver && answer === correctAnswer ?  correctStyle : isOver && answer === selectAnswer ? wrongStyle : {} }   htmlFor={inputId} key={labelId} className='question-answer'>{he.decode(answer)}</label> 
                        </div>
                    )
                })  
            }
        </div>  
    )
}
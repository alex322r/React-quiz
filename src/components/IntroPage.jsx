
import BlobTopAnimation from '../assets/BlobAnimationTop.svg'
export default function IntroPage({setStartQuiz}) {
    
    
    return (
        <main className="quiz-introPage">
            <div className='blob blob-top'>
                <img src={BlobTopAnimation} alt="" />
            </div>
            
            <h1 className="quiz-title">Quizzical by Alexis Rodriguez</h1>
            <p className="quiz-description">Test your knowledge with this quiz</p>
            <button onClick={() => setStartQuiz(true)} className="quiz-startButton">Start Quiz</button>
            <div className="blob blob-bottom">
                <img src={BlobTopAnimation} alt="" />
            </div>
        </main>
    )


}

export default function ScoreBar ({score, newGame})  {
   return (
        <div className='score-bar'>
            <p>{`You scored ${score}/5 correct answers`}</p>
            <button onClick={newGame} >Play Again</button>
        </div>
    )
}
import { useState } from 'react'

type Answer = string
type Answers = [Answer, Answer, Answer, Answer]
type AnswersUnion = Answers[number]

export default function AnswersSection(
  { answers, correctAnswer }: 
  { answers: Answers, correctAnswer: AnswersUnion }
) {
  const [selected, setSelected] = useState<AnswersUnion>()

  const getClassName = (answer: AnswersUnion) => {
    let baseClass = 'marquee-answer'

    if (selected !== answer) {
      return baseClass
    }

    if (selected === answer) {
      if (correctAnswer === answer) {
        return `${baseClass} correct`
      }
      return `${baseClass} incorrect`
    }
  }

  const selectAnswer = (answer: AnswersUnion) => {
    setSelected(answer)
  }

  return (
    <div className='marquee-container'>
      <div className='answer-status'>
        {Boolean(selected) && selected === correctAnswer && "Correct"}
        {Boolean(selected) && selected !== correctAnswer && "Incorrect"}
      </div>
      <div className='answers-container'>
        {answers.slice(0, 2).map(answer => (
          <div 
            key={answer} 
            onClick={() => selectAnswer(answer)} 
            className={getClassName(answer)}
          >
            {answer}
          </div>
        ))}
      </div>

      <div className='answers-container'>
        {answers.slice(2, answers.length).map(answer => (
          <div 
            key={answer} 
            onClick={() => selectAnswer(answer)} 
            className={getClassName(answer)}
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  )
}

import React from 'react'
import { AnswerObject } from '../App';
import { ButtonWrapper, Wrapper } from './QuestionCard.styles';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    useranswer: AnswerObject | undefined;
    quesNum: number;
    totalNum: number;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, useranswer, quesNum, totalNum }) => {
    return (
        <Wrapper>
            <p className='number'>
                Question: {quesNum} / {totalNum}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map((answer) => (
                    <ButtonWrapper key={answer} correct={useranswer?.correctAnswer===answer} userClicked={useranswer?.answer===answer} >
                        <button disabled={!!useranswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>

        </Wrapper>
    )
}

export default QuestionCard;

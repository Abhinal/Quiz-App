import { shuffleArray } from './utils';

export type Question = {
    correct_answer: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async () => {
    const endpoint = `https://opentdb.com/api.php?amount=5&category=19&difficulty=easy&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
        }
    ))
}

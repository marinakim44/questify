// import Question from "./Question";

export default function QuestionList({ questions }) {
  return (
    <ul className="divide-y divide-gray-200">
      {questions.map((q) => (
        <li key={q._id} className="py-4 flex">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{q.question}</p>
            <p className="text-sm text-gray-500">{q.answer}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

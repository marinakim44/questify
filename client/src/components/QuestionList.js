import Question from "./Question";

export default function QuestionList({ questions }) {
  return (
    <div style={{ backgroundColor: "pink" }}>
      {questions?.length > 0 &&
        questions.map((q) => {
          return (
            <div key={q._id}>
              <Question data={q} />
            </div>
          );
        })}
    </div>
  );
}

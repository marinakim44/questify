// import Question from "./Question";

export default function QuestionList({ questions }) {
  return (
    <div>
      <table className="table-auto brder-collapse border border-slate-500">
        <thead className="sticky top-40">
          <tr>
            <th className="border border-slate-500 py-3"></th>
            {questions &&
              questions.length > 0 &&
              Object.keys(questions[0])
                .filter((k) => ["question", "answer", "assignedTo"].includes(k))
                .map((k, i) => (
                  <th key={i} className="border border-slate-500 py-3">
                    {k}
                  </th>
                ))}
          </tr>
        </thead>
        <tbody>
          {questions &&
            questions.length > 0 &&
            questions.map((q) => (
              <tr key={q._id}>
                <td className="px-10 py-1 border border-slate-500">
                  <input type="checkbox" id={q._id} name={q._id} />
                </td>
                {Object.keys(q)
                  .filter((k) =>
                    ["question", "answer", "assignedTo"].includes(k)
                  )
                  .map((k, i) => (
                    <td key={i} className="px-10 py-1 border border-slate-500">
                      {q[k]}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

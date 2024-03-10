import Highlighter from "react-highlight-words";

export default function QuestionList({
  searchField,
  questions,
  handleClickCheckbox,
  selectedQuestions,
}) {
  return (
    <div>
      <div className="flex flex-row">
        <h2 className="ml-10 mr-1 italic font-bold">
          {questions.length} questions
        </h2>

        {selectedQuestions.length > 0 ? (
          <h2 className="italic font-bold">
            {`| ${selectedQuestions.length} selected`}
          </h2>
        ) : (
          ""
        )}
      </div>
      <table className="mx-10 table-auto brder-collapse border border-slate-500">
        <thead className="sticky top-40 bg-slate-300">
          <tr>
            <th className="border border-slate-300 py-3"></th>
            {questions &&
              questions.length > 0 &&
              Object.keys(questions[0])
                .filter((k) => ["question", "answer", "assignedTo"].includes(k))
                .map((k, i) => (
                  <th key={i} className="border border-slate-300 py-3">
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
                <td className="px-5 py-1 border border-slate-300">
                  <input
                    type="checkbox"
                    id={q._id}
                    name={q._id}
                    onClick={handleClickCheckbox}
                    checked={selectedQuestions.includes(q._id)}
                  />
                </td>
                {Object.keys(q)
                  .filter((k) =>
                    ["question", "answer", "assignedTo"].includes(k)
                  )
                  .map((k, i) => (
                    <td key={i} className="px-5 py-1 border border-slate-300">
                      <Highlighter
                        highlightClassName="highlighted-text"
                        searchWords={[searchField]}
                        autoEscape={true}
                        textToHighlight={q[k]}
                      />
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

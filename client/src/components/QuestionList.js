import Highlighter from "react-highlight-words";
import FilterListIcon from "@mui/icons-material/FilterList";
import UpdateIcon from "@mui/icons-material/Update";

export default function QuestionList({
  searchField,
  questions,
  handleClickCheckbox,
  selectedQuestions,
  handleOpenQuestion,
  handleGetLogs,
  handleFilter,
  filtersApplied,
}) {
  return (
    <div>
      <table className="mx-10 table-auto brder-collapse border border-slate-500 hover:border-collapse">
        <thead
          className="bg-slate-300"
          style={{
            position: "sticky",
            top: selectedQuestions.length > 0 ? "340px" : "280px",
          }}
        >
          <tr>
            <th className="border border-slate-300 py-3"></th>
            {questions &&
              questions.length > 0 &&
              ["question", "answer", "assignedTo", "properties"].map((k, i) => (
                <th
                  key={i}
                  name={k}
                  className={`border border-slate-300 py-3 ${
                    k === "properties" || k === "assignedTo"
                      ? "cursor-pointer"
                      : ""
                  }`}
                  onClick={
                    k === "properties"
                      ? () => handleFilter("properties")
                      : () => handleFilter("assignedTo")
                  }
                >
                  <div className="flex flwx-row justify-center">
                    <p>{k}</p>
                    {k === "properties" || k === "assignedTo" ? (
                      <FilterListIcon />
                    ) : (
                      ""
                    )}
                    {filtersApplied.includes(k) ? (
                      <p className="text-xs text-pink-500">(1)</p>
                    ) : (
                      ""
                    )}
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {questions &&
            questions.length > 0 &&
            questions.map((q) => (
              <tr key={q._id} id={q._id} className="hover:bg-slate-100">
                <td className="px-5 py-1 border border-slate-300 hover:bg-slate-100 cursor-pointer">
                  <input
                    type="checkbox"
                    id={q._id}
                    name={q._id}
                    onChange={handleClickCheckbox}
                    checked={selectedQuestions.includes(q._id)}
                  />
                </td>

                <td className="px-5 py-1 border border-slate-300 cursor-pointer">
                  <div className="flex flex-row justify-between">
                    <Highlighter
                      highlightClassName="highlighted-text"
                      searchWords={[searchField]}
                      autoEscape={true}
                      textToHighlight={q["question"] || ""}
                      onClick={() => handleOpenQuestion(q._id)}
                    />
                    <UpdateIcon
                      onClick={() => handleGetLogs(q._id)}
                      className="text-slate-200"
                    />
                  </div>
                </td>
                <td
                  className="px-5 py-1 border border-slate-300 cursor-pointer"
                  onClick={() => handleOpenQuestion(q._id)}
                >
                  <Highlighter
                    highlightClassName="highlighted-text"
                    searchWords={[searchField]}
                    autoEscape={true}
                    textToHighlight={q["answer"] || ""}
                  />
                </td>
                <td
                  className="px-5 py-1 border border-slate-300 cursor-pointer"
                  onClick={() => handleOpenQuestion(q._id)}
                >
                  <Highlighter
                    highlightClassName="highlighted-text"
                    searchWords={[searchField]}
                    autoEscape={true}
                    textToHighlight={q["assignedTo"] || ""}
                  />
                </td>
                <td
                  className="px-5 py-1 border border-slate-300 cursor-pointer"
                  onClick={() => handleOpenQuestion(q._id)}
                >
                  {q.properties && q.properties.length > 0
                    ? q.properties[0].split(",").map((p, i) => (
                        <div key={i} className="m-2">
                          <Highlighter
                            key={i}
                            highlightClassName="highlighted-text"
                            searchWords={[searchField]}
                            autoEscape={true}
                            textToHighlight={p || ""}
                            className={`${
                              !p ? "none" : "bg-green-500"
                            } text-white p-1 rounded`}
                          />
                        </div>
                      ))
                    : ""}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Question({ data }) {
  const {
    companyName,
    question,
    questionDesc,
    answer,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt,
    assignedTo,
    properties,
  } = data;
  return (
    <div>
      <p>Company name: {companyName}</p>
      <p>Question: {question}</p>
      <p>Question description: {questionDesc}</p>
      <p>Answer: {answer}</p>
      <p>Created by: {createdBy}</p>
      <p>Created at: {createdAt}</p>
      <p>Updated by: {updatedBy}</p>
      <p>Updated at: {updatedAt}</p>
      <p>Assigned to: {assignedTo}</p>
      <p>Properties: {properties}</p>
    </div>
  );
}

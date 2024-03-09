import { useState, useEffect, useCallback } from "react";
import QuestionList from "./components/QuestionList";

function App() {
  const [docs, setDocs] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/get-data");
      const data = await response.json();
      setDocs(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <h1>React</h1>
      <QuestionList questions={docs} />
    </div>
  );
}

export default App;

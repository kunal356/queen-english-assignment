import { useEffect, useState } from "react";
import { decode } from "html-entities";
import "./App.css";
//https://opentdb.com/api.php?amount=1

export default function App() {
  const [quiz, setQuiz] = useState({});
  const getAnswer = (event) => {
    const { name, value } = event.target;
    setQuiz({ ...quiz, [name]: value });
  };
  const getData = async () => {
    try {
      let url = "https://opentdb.com/api.php?amount=1";
      let res = await fetch(url);
      let data = await res.json();
      const { question: ques } = data.results[0];
      const { correct_answer: corrAns } = data.results[0];
      const { category: cat } = data.results[0];
      const newQuiz = {
        ques,
        corrAns,
        cat,
        userAns: "",
        output: "",
      };
      setQuiz(newQuiz);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div id="main">
      <div id="heading">
        <h1>Quiz Trivia</h1>
        <h1>{decode(quiz.ques)}</h1>
      </div>
      <div id="content">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            let userInput = quiz.userAns;
            let actualAns = quiz.corrAns;
            if (userInput.length === 0) {
              setQuiz({ ...quiz, output: "Please enter valid answer" });
              return;
            } else if (
              userInput.toLowerCase().trim() === actualAns.toLowerCase()
            ) {
              setQuiz({ ...quiz, output: "Your answer is correct" });
            } else {
              setQuiz({...quiz,output: `Your answer is incorrect. The correct answer was ${decode(actualAns)}`,
            });
            }
          }}>
        <p>Category: {quiz.cat}</p>
        <input
          type="text"
          name="userAns"
          onChange={getAnswer}
          value={quiz.userAns}
          ></input>
          <br/>
        <button className="btn_styles" type="submit">Submit</button>
        {/* <button className="btn_styles" >{quiz.corrAns}</button> */}
        <button className="btn_styles" onClick={getData}>
          Next
        </button>
        <h2>{quiz.output !== "" ? quiz.output : null}</h2>
        </form>
      </div>
    </div>
  );
}

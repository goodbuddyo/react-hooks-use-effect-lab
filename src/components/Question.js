import React,{useState,useEffect} from "react";

function Question({question,onAnswered}) {
  const [timeRemaining,setTimeRemaining]=useState(10);

  // add useEffect code
  useEffect(() => {
    const timerID=setTimeout(() => {
      setTimeRemaining(timeRemaining-1);
    },1000);

    function cleanup() {
      onAnswered(false);
      setTimeRemaining(10);
      clearTimeout(timerID);
    }

    // returning a cleanup function
    if(timeRemaining<=0) {
      console.log(timeRemaining)
      return cleanup()
    };

  },[timeRemaining,onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const {id,prompt,answers,correctIndex}=question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer,index) => {
        const isCorrect=index===correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question

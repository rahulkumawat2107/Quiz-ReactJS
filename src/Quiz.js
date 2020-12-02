import "./quiz_style.css"
import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";


function Quiz(props) {
    const {question, difficultyType, categoryNo} = props.location.state;

    const [array, setArray] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [flag, setFlag] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [time, setTime] = useState(30);

    //for shuffling the options
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    //calling api
    function apiCall() {
        fetch('https://opentdb.com/api.php?amount='+question+'&category='+categoryNo+'&difficulty='+difficultyType.toLowerCase()+'&type=multiple')
        .then(response => response.json())
        .then(response => {
            console.log("APi rseponse:", response)

            let arr = [];
            const {results} = response;
            for(let i = 0 ; i < results.length ; i++)
            {
                let obj = {
                    index : i,
                    question: results[i].question,
                    correct: results[i].correct_answer,
                    options: shuffle([...results[i].incorrect_answers, results[i].correct_answer])
                }
                arr.push(obj);
            }
            setArray(arr);
        })
    }

    //for handling api response and storing the response in array variable
    useEffect(() => {
        apiCall();       
    }, []) //empty [] implies this function acts like componentDidMount 

    //for handling updation in array
    useEffect(() => {
        console.log("useeffect array", array)
    }, [array])

    useEffect(() => {
        console.log("current question", currentQuestion)
        if(currentQuestion > question-1){
            console.log("out of index")
        }
    }, [currentQuestion])


    //Timer for the quiz
    useEffect(() => {
        let interval = null;
        if(time >= 0)
        {
            interval = setInterval(() => {
                setTime(time => time - 1);
            }, 1000);
        }
        else if(currentQuestion < question - 1)
        {
            setCurrentQuestion(currentQuestion + 1)
            setTime(30);
            clearInterval(interval);
        }
        else{
            console.log(flag)
            setFlag(true)
            clearInterval(interval)
        }
        return () => clearInterval(interval);
        
    }, [time])
    
    //handling button click and changing the value of current question
    const handleClick = (e) => {
        console.log("button clicked", e.target.innerText)
        // console.log(array[currentQuestion])
        if(e.target.innerText === array[currentQuestion].correct)
        {
            setCorrectAnswer(correctAnswer+1)
        }
        if(currentQuestion === question - 1){
            setFlag(true)
            return
        }else{
            setCurrentQuestion(currentQuestion + 1)
            setTime(30);
        }
    }

    //function to reset the quiz
    function resetQuiz(){
        console.log("reset")
        setArray([]);
        apiCall();
        setFlag(false);
        setTime(30);
        setCurrentQuestion(0);
        setCorrectAnswer(0);
    }

    return(
        <div className="quiz-container">
            <div className='app'>
                {array.length > 0 && flag === false &&
                    <div>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion+1}</span>/{props.location.state.question}
                            </div>
                            <div className="circle">
                                <span >{time}</span>
                            </div>
                        </div>

                        <div className='question-text'>{array[currentQuestion].question}</div>

                        <div className='answer-section'>
                            <button onClick = {(e) => handleClick(e)}>{array[currentQuestion].options[0]}</button>
                            <button onClick = {(e) => handleClick(e)}>{array[currentQuestion].options[1]}</button>
                        </div>

                        <div className='answer-section'>
                            <button onClick = {(e) => handleClick(e)}>{array[currentQuestion].options[2]}</button>
                            <button onClick = {(e) => handleClick(e)}>{array[currentQuestion].options[3]}</button>
                        </div>
                    </div>
                }  
                {array.length <= 0 && flag === false &&
                    <div>
                        <h1>Loading...</h1>
                    </div>
                }
                {flag === true &&
                    <div className="score">
                        <h2>Your Score</h2>
                        <h1>{correctAnswer}/{question}</h1>
                        <Link style={{ textDecoration: 'none' }} to = "/">
                            <button>Go back to Home</button>
                        </Link>
                        <button onClick = {resetQuiz}>Reset Quiz</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Quiz

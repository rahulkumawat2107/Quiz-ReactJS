import React, {useState, useEffect} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Link} from "react-router-dom";
import logo from "./quiz_logo.png"


function Types() {

    const [question, setQuestion] = useState(1);
    const [categoryNo, setCategory] = useState(23);
    const [difficultyType, setDifficulty] = useState('Easy');

    useEffect(() => {
        if(question > 50){
            console.log("out of limit");
        }else{
        console.log(question)
        }
        
    }, [question])

    function checkQuestions(e) {
        if(e.target.value <= 50 && e.target.value > 0){
            setQuestion(e.target.value);
        }else if(e.target.value === ''){
            console.log(' ')
        }
        else{
            alert("Enter a valid value")
        }
    }


    const category = [
        { value: 23, label: 'History' },
        { value: 24, label: 'Politics' },
        { value: 9, label: 'General Knowledge' },
        { value: 26, label: 'Celebrities' },
        { value: 21, label: 'Sports' },
        { value: 28, label: 'Vehicles' },
    ];

    const difficulty = [
        'Easy', 'Medium', 'Hard'
    ];

    const defaultCategory = category[0].label;
    const defaultDifficulty = difficulty[0];

    return(
        <div className="main-container">
            <img className="logo" src={logo} />
            <div className = "container">
                <div className="main-title">
                    <h1>Welcome Player,</h1>
                    <h2>are you ready to take this quiz?</h2>
                </div>
                <div className="form-style">
                    <div className="input-ques">
                        <h2>Please enter the number of question(Max. 50)</h2>
                        <input type="text" placeholder="Enter here" onChange={(e) => checkQuestions(e)}></input>
                    </div>
                    {/* <input type="text" placeholder="Enter the no. of questions" onChange={(e) => setQuestion(e.target.value)}></input> */}
                    <div className="dropdown-col">
                        <h2>Please select a category</h2>
                        <Dropdown className="dropdown" options={category} style={{border: '1px solid black'}} value={defaultCategory} placeholder="Select an option" onChange={(e) => setCategory(e.value)}/>
                    </div>
                    <div className="dropdown-col">
                        <h2>Please select a difficulty</h2>
                        <Dropdown className="dropdown" options={difficulty}  value={defaultDifficulty} placeholder="Select an option" onChange={(e) => setDifficulty(e.value)} />
                    </div>
                    {/* <button type="submit">Start Quiz</button> */}
                    <Link to={{
                            pathname: '/Quiz',
                            state:{
                                question,
                                categoryNo,
                                difficultyType
                            }
                        }}>
                        <button className="btn" type="submit">Start Quiz</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Types
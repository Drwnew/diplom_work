import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Latex from "react-latex-next";
import {renderToString} from "react-dom/server";

const EquationSolver = () => {
    const [equation, setEquation] = useState('');
    const [answer, setAnswer] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let json = {
            "equation": equation
        }

        let response = await fetch('/solve_equation', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(json)
        })
        let responseJson = await response.text()
        let resp = JSON.parse(responseJson)
        let answer = []
        if (resp["roots"].length === 2) {
            answer.push(<Latex>${"x_{1} = " + resp["roots"][0]}$</Latex>)
            answer.push(<Latex>${"x_{2} = " + resp["roots"][1]}$</Latex>)
        } else if (resp["roots"].length === 1) {
            answer = `x = ${renderToString(resp["roots"][0])}`
        }
        setAnswer(answer)
    };


    const handleChange = (event) => {
        setEquation(event.target.value);
    };

    const printAnswer = () => {
        if (answer.length === 0) {
            return ("Нет решений")
        } else if (answer.length === 2) {
            return (
                <div style={{display: "flex"}}>
                    {answer[0]}
                    <pre>  </pre>
                    {answer[1]}
                </div>
            )
        } else if (answer.length === 1) {
            return (
                <div>
                    {answer[0]}
                </div>
            )
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Уравнение"
                variant="outlined"
                value={equation}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <div style={{display: "flex", marginTop: "10px", marginBottom: "10px"}}>
                <span style={{marginRight: "10px"}}>Ответ:</span>
                {printAnswer()}
            </div>
            <Button type="submit" variant="contained" color="primary">
                Решить
            </Button>
        </form>
    );
};

export default EquationSolver;

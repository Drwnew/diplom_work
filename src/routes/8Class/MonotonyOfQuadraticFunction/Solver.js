import React, {useState} from 'react';
import Latex from "react-latex-next";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LatexDisplay from "../../../templates/LatexDisplay";
import Typography from "@mui/material/Typography";

const Solver = () => {
    const [equation, setEquation] = useState('');
    const [answer, setAnswer] = useState([]);
    const [isGrow, setIsGrow] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        let json = {
            "equation": equation
        }

        let response = await fetch('/solve_monotony_of_quadratic_function', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(json)
        })
        let responseJson = await response.text()
        let resp = JSON.parse(responseJson)
        let intervals = []
        intervals = []
        resp["intervals"].forEach((interval) => {
            if (interval["is_grow"]) {
                intervals.push({"text": "Промежуток возрастания ", "latex": interval["latex"]})
            } else {
                intervals.push({"text": "Промежуток убывания ", "latex": interval["latex"]})
            }
        })
        setAnswer(intervals)
    }

        const handleChange = (event) => {
            setEquation(event.target.value);
        };

        const printAnswer = () => {
            if (answer.length > 0) {
                if (answer.length > 1) {
                    return (
                        <div>
                            <div style={{display: "flex", marginTop: "10px",}}>
                                <span style={{marginRight: "10px"}}>{answer[0]["text"]}</span>
                                <LatexDisplay latexString={answer[0]["latex"]} />
                            </div>
                            <div style={{display: "flex", marginTop: "10px",}}>
                                <span style={{marginRight: "10px"}}>{answer[1]["text"]}</span>
                                <LatexDisplay latexString={answer[1]["latex"]} />
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <span>{answer[0]["text"]}</span>
                        </div>
                    )
                }
            }
        }

        return (
            <form onSubmit={handleSubmit}>
               <div>
                   <TextField
                    label="Функция"
                    variant="outlined"
                    value={equation}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
               </div>
                <div style={{display: "flex", marginBottom: "10px", marginTop: "10px"}}>
                    <span style={{marginRight: "10px"}}>Ответ:</span>
                    {printAnswer()}
                </div>
                <Button type="submit" variant="contained" color="primary">
                    Решить
                </Button>
            </form>
        )
    }

    export default Solver;
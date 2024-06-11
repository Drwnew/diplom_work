import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    Divider,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputVariableRange from "./InputVariableRange";
import LatexDisplay from "./LatexDisplay";

const Task = ({task, index, setTasks}) => {

 const handleTaskTextChange = (index, newText) => {
        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index].taskText = newText;
            return updatedTasks;
        });
    };

    const handleEquationTemplateChange = (index, templateIndex) => {
        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index].templates[templateIndex].value = !prevTasks[index].templates[templateIndex].value;
            return updatedTasks;
        });
    };

    const handleVariableChange = (variableIndex, taskIndex = index, sTasks = setTasks) => {
        return (type, value) => {
            sTasks(prevTasks => {
                    const updatedTasks = [...prevTasks];
                    updatedTasks[taskIndex]["variables"][variableIndex][type] = value;
                    return updatedTasks;
                }
            )
        }

    }

    const generateVariables = () =>{
        let maxVariablesCount = 0
        task.templlates.forEach( (template) => {
            if (template.count_of_parameters > maxVariablesCount){
                maxVariablesCount = template.count_of_parameters
            }
        } )
        for (let i = 0; i < maxVariablesCount; i++){}
    }

    return (
        <div>
        <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>Задание {index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    <TextField
                        label="Текст задания"
                        value={task.taskText}
                        onChange={e => handleTaskTextChange(index, e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Divider/>
                    <Typography variant="subtitle1" gutterBottom>
                        Шаблоны уравнения:
                    </Typography>
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {task.templates.map((template, templateIndex) => (
                            <div style={{display: "flex", marginRight: "16px"}}>
                                <Checkbox
                                    key={templateIndex}
                                    checked={template.value}
                                    onChange={() => handleEquationTemplateChange(index, templateIndex)}
                                    label={`Шаблон ${templateIndex + 1}`}
                                />

                                <LatexDisplay latexString={template.latex_viewing}/>
                            </div>

                        ))}
                        </div>
                        <Divider/>
                        <div style={{display: "flex", flexWrap: "wrap"}}>
                            {task["variables"].map((range, variableIndex) => (
                                 <InputVariableRange variableIndex={variableIndex} variableName={"п" + (variableIndex + 1)}
                                                    variableRange={range}
                                                    setVariableRange={handleVariableChange(variableIndex)}/>
                                    )
                            )}
                            {/*<InputVariableRange index={variableIndex} variableName={"п" + variableIndex} variableRange={task["variables"][variableIndex]} setVariableRange={handleVariableChange}/>*/}
                        </div>
                    </div>
            </AccordionDetails>
        </Accordion>
    </div>
    );
};

export default Task;
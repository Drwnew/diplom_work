import React, {useState} from 'react';
import Task from "./templates/Task";
import {Button} from "@mui/material";


function TemplateGenerator({numberOfAccordions}) {
    const [tasks, setTasks] = useState(Array.from({length: numberOfAccordions}, () => ({
   taskText: "Найти промежутки возрастания и убывания функции",
   templates:[
      {
         latex_viewing:"y=p_{1}x^{2}+p_{2}x+p_{3}",
         python_viewing:"y={}x^2+{}x+{}",
         count_of_parameters:3,
         value: false,
      },
      {
         latex_viewing:"y=\\frac{p_{1}}{p_{2}}x^{2}+\\frac{p_{3}b}{p_{4}}x+\\frac{p_{5}}{p_{6}}",
         python_viewing:"y=({}x^2)/{}+({}x)/{}+{}/{}",
         count_of_parameters:6,
         value: false,
      },
       {
         latex_viewing:"y+p_{1}x^{2}+p_{2}x+p_{3}=p_{4}x^{2}+p_{5}x+p_{6}",
         python_viewing:"y+{}x^2+{}x+{}={}x^2+{}x+{}",
         count_of_parameters:6,
         value: false,
      }
   ],
       variables: [
            {from: 0, to: 0},
            {from: 0, to: 0},
            {from: 0, to: 0},
             {from: 0, to: 0},
            {from: 0, to: 0},
            {from: 0, to: 0}
            ]
    })));

        const handleGenerateEquations = () =>{
        console.log(tasks)
    }

    return (
        <div>
            {tasks.map((task, index) => (
                <Task task={task} index={index} setTasks={setTasks}/>
            ))}
            <Button onClick={handleGenerateEquations} variant="contained">
                Сгенерировать уравнения
            </Button>
        </div>
    );
}

export default TemplateGenerator;

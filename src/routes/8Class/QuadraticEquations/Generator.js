import React, {useState} from 'react';
import {Button, Checkbox, FormControlLabel, Stack, TextField} from '@mui/material';
import LatexDisplay from "../../../templates/LatexDisplay";

const EquationSettings = () => {
    const [settings, setSettings] = useState({
        numVariants: 2,
        numTasks: 2,
        minAnswer: -10,
        maxAnswer: 10,
        sqrtInAnswerIsPossible: true,
        fractionInAnswerIsPossible: true,
        templates: [
      {
         latex_viewing:"p_{1}x^{2}+p_{2}x+p_{3}=0",
         python_viewing:"{}*x^2+{}*x+{}=0",
         count_of_parameters:3,
          checked: false
      },
      {
         latex_viewing:"\\frac{p_{1}}{p_{2}}x^{2}+\\frac{p_{3}b}{p_{4}}x+\\frac{p_{5}}{p_{6}}=0",
         python_viewing:"({}*x^2)/{}+({}*x)/{}+{}/{}=0",
         count_of_parameters:6,
          checked: false
      },
       {
         latex_viewing:"p_{1}x^{2}+p_{2}x+p_{3}=p_{4}x^{2}+p_{5}x+p_{6}",
         python_viewing:"{}*x^2+{}*x+{}={}*x^2+{}*x+{}",
         count_of_parameters:6,
           checked: false
      }
      ]
    });
        const [downloadLink, setDownloadLink] = useState('');

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            const index = parseInt(name, 10);
            setSettings(prevSettings => {
                const newTemplates = [...prevSettings.templates];
                newTemplates[index] = { ...newTemplates[index], checked: checked };
                return { ...prevSettings, templates: newTemplates };
            });
        } else {
            setSettings(prevSettings => ({
                ...prevSettings,
                [name]: value
            }));
        }
    };

    const handlePossibilityCheckboxChange = (event) =>{
        const { name, checked } = event.target
        setSettings(prevSettings => ({
                ...prevSettings,
                [name]: checked
            }));
    }

    const handleSubmit = async () => {
         let json = JSON.stringify(settings, null, 2)
        console.log(json);
        let response = await fetch('/generate_quadratic_equations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(json)
        })

        let url = window.URL.createObjectURL(await response.blob());
        setDownloadLink(url)

    };

    return (
        <Stack spacing={2} sx={{margin: '0 auto'}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <Checkbox
                    name="0"
                    checked={settings.templates[0].checked}
                    onChange={handleChange}
                />
                <LatexDisplay latexString={settings.templates[0].latex_viewing}/>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <Checkbox
                    name="1"
                    checked={settings.templates[1].checked}
                    onChange={handleChange}
                />
                <LatexDisplay latexString={settings.templates[1].latex_viewing}/>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <Checkbox
                    name="2"
                    checked={settings.templates[2].checked}
                    onChange={handleChange}
                />
                <LatexDisplay latexString={settings.templates[2].latex_viewing}/>
            </div>
            <FormControlLabel
                control={
                    <Checkbox
                        name="fractionInAnswerIsPossible"
                        checked={settings.fractionInAnswerIsPossible}
                        onChange={handlePossibilityCheckboxChange}
                    />
                }
                label="Разрешить рациональные корни"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="sqrtInAnswerIsPossible"
                        checked={settings.sqrtInAnswerIsPossible}
                        onChange={handlePossibilityCheckboxChange}
                    />
                }
                label="Разрешить иррациональные корни"
            />
            <TextField
                label="Количество вариантов"
                name="numVariants"
                type="number"
                value={settings.numVariants}
                onChange={handleChange}
            />
            <TextField
                label="Количество заданий"
                name="numTasks"
                type="number"
                value={settings.numTasks}
                onChange={handleChange}
            />
            <TextField
                label="Нижний порог значения корня"
                name="minAnswer"
                type="number"
                value={settings.minAnswer}
                onChange={handleChange}
            />
            <TextField
                label="Верхний порог значения корня"
                name="maxAnswer"
                type="number"
                value={settings.maxAnswer}
                onChange={handleChange}
            />
            <Button onClick={handleSubmit} variant="contained">
                Сгенерировать
            </Button>
            {downloadLink && (
                <Button href={downloadLink} variant="outlined" download="Уравнения.docx">
                    Загрузить
                </Button>
            )}
        </Stack>
    );
};

export default EquationSettings;

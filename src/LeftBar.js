import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Импортируем иконку


const ScrollableAccordionContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const accordionData = [
    { title: '7 класс', content: [{text: "Текст 1", link: "test"}, {text: "Текст 1", link: "Ссылка 1"}, {text: "Текст 1", link: "Ссылка 1"}] },
    { title: '8 класс', content: [{text: "Монотонность квадратичной функции", link: "MonotonyOfQuadraticFunction"}, {text: "Нахождение корней квадратного уравнения", link: "QuadraticEquaetion"}, {text: "Текст 1", link: "Ссылка 1"}]},
    { title: '9 класс', content: [{text: "Текст 1", link: "Ссылка 1"}, {text: "Текст 1", link: "Ссылка 1"}, {text: "Текст 1", link: "Ссылка 1"}] },
    // Добавьте больше данных по мере необходимости
  ];

  const filteredAccordions = accordionData.filter(
    (accordion) =>
      accordion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      accordion.content.some((link) => link.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Paper style={{ marginTop: '10px', width: '400px', height: '80vw', overflowY: 'auto', padding: '16px', boxSizing: "border-box" }}>
      <TextField
        label="Поиск"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      {filteredAccordions.map((accordion, index) => (
        <Accordion key={index} style={{ marginBottom: '8px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />} // Используем иконку
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <Typography>{accordion.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul style={{margin: '0', paddingLeft: '20px'}}>
              {accordion.content.map((link, i) => (
                <li key={i}>
                  <a href={`${link["link"]}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {link["text"]}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

export default ScrollableAccordionContainer;
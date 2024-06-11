import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MonotonyOfQuadraticFunction from "./routes/8Class/MonotonyOfQuadraticFunction/MonotonyOfQuadraticFunction";
import Layout from "./Layout";
import TemplateGenerator from "./TemplateGenerator";
import QuadraticEquaetion from "./routes/8Class/QuadraticEquations/QuadraticEquaetion";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}/>
          <Route path="MonotonyOfQuadraticFunction" element={<MonotonyOfQuadraticFunction />} />
          <Route path="QuadraticEquaetion" element={<QuadraticEquaetion/>} />
          <Route path="test" element={<TemplateGenerator numberOfAccordions={4}/>} />
      </Routes>
    </Router>
  );
}

export default App;
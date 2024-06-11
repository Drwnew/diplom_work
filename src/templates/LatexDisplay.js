import React, { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const LatexDisplay = ({ latexString }) => {

  return (
      <div style={{fontSize: "20px"}}>
            <Latex>${latexString}$</Latex>
      </div>
  );
};

export default LatexDisplay;

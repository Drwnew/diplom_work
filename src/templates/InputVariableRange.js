import React from 'react';
import {TextField} from "@mui/material";

const InputVariableRange = ({variableName, variableRange, setVariableRange}) => {

    return (
        <div style={{display: "flex", alignItems: "center", width: "200px", marginRight: "16px"}}>
            <TextField
                label={`${variableName} от`}
                value={variableRange["from"]}
                onChange={e => setVariableRange("from", e.target.value)}
                size="small"
                margin="normal"
            />
            <TextField
                label={`${variableName} до`}
                value={variableRange["to"]}
                onChange={e => setVariableRange("to", e.target.value)}
                size="small"
                margin="normal"
            />
        </div>
    );
};

export default InputVariableRange;
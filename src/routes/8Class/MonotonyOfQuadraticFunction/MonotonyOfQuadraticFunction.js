import React from 'react';
import Header from "../../../Header";
import LeftBar from "../../../LeftBar";
import SectionSwitcher from "../../../SectionSwitcher";
import Solver from "./Solver";
import Generator from "./Generator";
import Typography from "@mui/material/Typography";

const MonotonyOfQuadraticFunction = () => {
    return (
        <div>
            <Header/>
            <div style={{display: "flex"}}>
                <LeftBar/>
                <div style={{display: "flex", flexDirection: "column", width: "100%", padding: "10px"}}>
                    <Typography variant="h6" component="div">Промежутки знакопостоянства квадратичной
                        функции</Typography>
                    <div>
                        <SectionSwitcher sections={["Решить", "Сгенерировать"]}>
                            <Solver/>
                            <Generator/>
                        </SectionSwitcher>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MonotonyOfQuadraticFunction;
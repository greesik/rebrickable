import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Step1 } from "./components/Step1";
import { Route, Routes } from "react-router-dom";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";

export function App() {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<Step1 />} />
                <Route path="/step2" element={<Step2 />} />
                <Route path="/step3" element={<Step3 />} />
            </Routes>
        </AppLayout>
    );
}

const AppLayout = styled(Box)`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1f2138;
`;

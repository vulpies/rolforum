import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import EpisodesPage from "./pages/episodes_page"
import MainPage from "./pages/main_page"
import Registration from "./pages/registration"
import SingleEpi from "./pages/single_episode/singleEpi"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<MainPage />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/episodes/:epiId" element={<SingleEpi />} />
                    <Route path="/episodes" element={<EpisodesPage />} />
                    <Route path="/exit" element={<Navigate to="/" replace />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

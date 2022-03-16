import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EpisodesPage from "./pages/episodes_page"
import MainPage from "./pages/main_page"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<MainPage />} />
                    <Route path="/episodes" element={<EpisodesPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

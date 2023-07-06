import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Game from "./pages/Game/Game";
import Home from "./pages/home/home"


function App() {
    return(
        <BrowserRouter>
           <Routes>
                <Route path="/game" element={<Game/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/home" replace />}/>
            </Routes>

        </BrowserRouter>
    )
}

export default App;

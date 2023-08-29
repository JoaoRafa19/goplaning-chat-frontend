import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomPage from "./pages/room/Room";
import GamePage from "./pages/game/Game";

function App() {
    return (
        <Router>
            <switch>
                <Routes>
                    <Route path="/" Component={RoomPage} />
                    <Route path="/game/:room_id" Component={GamePage} />
                </Routes>
            </switch>

        </Router>
    )
}

export default App
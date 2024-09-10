import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Error from './pages/Error';
import Landing from './pages/Landing';
import Leaderboard from './pages/Leaderboard';
import Game from './pages/Game';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: '/leaderboard',
                element: <Leaderboard />,
            },
            {
                path: '/leaderboard/:leaderboardId',
                element: <Leaderboard />,
            },
            {
                path: '/game/:gameId',
                element: <Game />,
            },
        ],
    }
]);

export default router
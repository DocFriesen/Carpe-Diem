import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import DailySchedule from "./pages/DailySchedule";
import Planning from "./pages/Planning";
import UserInfo from "./pages/UserInfo";
import Settings from "./pages/Settings";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<DailySchedule />} />
                <Route path="planning" element={<Planning />} />
                <Route path="user-info" element={<UserInfo />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Index from "./pages/Index";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Index />} />
                    <Route path="admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

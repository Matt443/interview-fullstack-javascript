import Button from "@mui/material/Button";
import TopBar from "./components/TopBar.component";

function App() {
    return (
        <>
            <TopBar></TopBar>
            <div className="text-green-800 m-2">TEST</div>
            <Button variant="contained">Hello world</Button>
        </>
    );
}

export default App;

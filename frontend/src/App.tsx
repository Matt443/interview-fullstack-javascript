import Button from "@mui/material/Button";
import TopBar from "./components/TopBar.component";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./features/counterSlice.feature";
import { RootState } from "./stores/state.store";

function App() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <>
            <TopBar></TopBar>
            <div className="text-green-800 m-2">TEST</div>
            <Button variant="contained">Hello world</Button>
            <div>
                <p>Count: {count}</p>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>
        </>
    );
}

export default App;

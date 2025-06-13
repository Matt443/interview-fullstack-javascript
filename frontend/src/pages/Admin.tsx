import { Button } from "@mui/material";
import CityPresentation from "../components/CityPresentation.component";
import Nav from "../components/Nav.component";
import { addCity } from "../utils/api.util";
import { setAddMessage, setNewCityCount, setNewCityName } from "../features/counterSlice.feature";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/state.store";

export default function Admin() {
    const dispatch = useDispatch();
    const newCityName = useSelector((state: RootState) => state.data.newCityName);
    const newCityCount = useSelector((state: RootState) => state.data.newCityCount);
    const addMessage = useSelector((state: RootState) => state.data.addMessage);
    return (
        <>
            <Nav></Nav>
            <main className="text-white p-2">
                <CityPresentation checkboxSelection={true}>
                    <h2 className="font-bold text-xl">Add city</h2>
                    <form
                        className="flex mt-4"
                        onKeyDown={async (e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                    >
                        <div className="input-container flex flex-col lg:flex-row lg:items-center items-start lg:mr-2 w-[100%] lg:max-w-[300px]">
                            <label htmlFor="count-min" className="text-white whitespace-nowrap">
                                City name:
                            </label>
                            <input
                                type="text"
                                id="count-min"
                                className="border-2 border-green-700 focus:border-green-400 outline-none p-2 rounded-sm text-sm text-white lg:ml-2 w-[100%]"
                                onInput={(event) => {
                                    dispatch(setAddMessage(""));
                                    dispatch(
                                        setNewCityName((event.target as HTMLInputElement).value),
                                    );
                                }}
                            />
                        </div>
                        <div className="input-container flex flex-col lg:flex-row lg:items-center items-start lg:mr-2 w-[100%] lg:max-w-[300px]">
                            <label htmlFor="count-min" className="text-white whitespace-nowrap">
                                Count:
                            </label>
                            <input
                                type="number"
                                id="count-min"
                                className="border-2 border-green-700 focus:border-green-400 outline-none p-2 rounded-sm text-sm text-white lg:ml-2 w-[100%]"
                                onInput={(event) => {
                                    dispatch(
                                        setNewCityCount(
                                            Number((event.target as HTMLInputElement).value),
                                        ),
                                    );
                                }}
                            />
                        </div>
                        <Button
                            variant="contained"
                            type="button"
                            className="text-sm p-2 h-[40px] mt-2"
                            sx={{
                                border: "2px solid var(--color-green-400)",
                                bgcolor: "var(--color-green-400)",
                                color: "var(--color-black)",
                                "&:hover": {
                                    bgcolor: "transparent",
                                    color: "var(--color-green-400)",
                                },
                            }}
                            onClick={async () => {
                                const response = await addCity({
                                    name: newCityName,
                                    count: newCityCount,
                                });
                                dispatch(setAddMessage(response));
                            }}
                        >
                            Add
                        </Button>
                    </form>
                    {addMessage}
                </CityPresentation>
            </main>
        </>
    );
}

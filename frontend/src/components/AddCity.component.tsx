import { addCity, getCities } from "../utils/api.util";
import {
    setAddMessage,
    setNewCityCount,
    setNewCityName,
    setSearchedCities,
} from "../features/stateSlice.feature";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/state.store";
import { Button } from "@mui/material";
import CountInput from "./CountInput.component";
import { preventRefresh } from "../utils/common";
import { buttonSx } from "../constants/styles.constant";

export default function AddCity() {
    const dispatch = useDispatch();
    const newCityName = useSelector((state: RootState) => state.data.newCityName);
    const newCityCount = useSelector((state: RootState) => state.data.newCityCount);
    const addMessage = useSelector((state: RootState) => state.data.addMessage);
    const min = useSelector((state: RootState) => state.data.min);
    const max = useSelector((state: RootState) => state.data.max);

    const inputValue = useSelector((state: RootState) => state.data.searchedFor);

    async function addCityHandler(): Promise<void> {
        const response = await addCity({
            name: newCityName,
            count: Number(newCityCount),
        });
        dispatch(setAddMessage(response));
        const responseGet = await getCities({ name: inputValue, min, max });
        dispatch(setSearchedCities(responseGet.rows));
    }
    function nameChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setAddMessage(""));
        dispatch(setNewCityName(event.target.value));
    }

    function countChangeHandler(value: string) {
        dispatch(setNewCityCount(value));
    }

    return (
        <>
            <h2 className="font-bold text-xl">Add city</h2>
            <form
                className="flex items-center"
                onKeyDown={(event) => preventRefresh(event.nativeEvent)}
            >
                <div className="input-container flex flex-col lg:flex-row lg:items-center items-start lg:mr-2 w-[100%] lg:max-w-[300px]">
                    <label htmlFor="count-min" className="text-white whitespace-nowrap">
                        City name:
                    </label>
                    <input
                        type="text"
                        placeholder={"Your city name"}
                        id="count-min"
                        className="border-2 border-green-700 focus:border-green-400 outline-none p-2 rounded-sm text-sm text-white lg:ml-2 w-[100%]"
                        onInput={nameChangeHandler}
                    />
                </div>
                <CountInput
                    inputCallback={countChangeHandler}
                    label={"Count"}
                    value={newCityCount}
                    placeholder={"Your city count"}
                ></CountInput>
                <Button
                    variant="contained"
                    type="button"
                    className="text-sm p-2 h-[40px] mt-2"
                    sx={buttonSx}
                    onClick={addCityHandler}
                >
                    Add
                </Button>
            </form>
            <span>{addMessage}</span>
        </>
    );
}

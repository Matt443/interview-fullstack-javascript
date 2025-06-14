import { useDispatch, useSelector } from "react-redux";
import CityAutocomplete from "./CityAutocomplete.component";
import { RootState } from "../stores/state.store";
import {
    setCountUpdate,
    setIdUpdate,
    setMessageUpdate,
    setNameUpdate,
    setSearchedCities,
    setSearchedForUpdate,
} from "../features/stateSlice.feature";
import CountInput from "./CountInput.component";
import { Button } from "@mui/material";
import { getCities, updateCity } from "../utils/api.util";
import { buttonSx } from "../constants/styles.constant";

export default function UpdateCity() {
    const inputValue = useSelector((state: RootState) => state.data.searchedForUpdate);
    const searchedFor = useSelector((state: RootState) => state.data.searchedFor);
    const cities = useSelector((state: RootState) => state.data.available);
    const countUpdate = useSelector((state: RootState) => state.data.update.count);
    const nameUpdate = useSelector((state: RootState) => state.data.update.name);
    const messageUpdate = useSelector((state: RootState) => state.data.update.message);
    const updateId = useSelector((state: RootState) => state.data.update.id);
    const min = useSelector((state: RootState) => state.data.min);
    const max = useSelector((state: RootState) => state.data.max);

    const dispatch = useDispatch();

    async function getCityDetails(): Promise<void> {
        const response = await getCities({ name: inputValue });
        dispatch(setCountUpdate(String(response.rows[0].count)));
        dispatch(setNameUpdate(String(response.rows[0].name)));
        dispatch(setIdUpdate(String(response.rows[0].id)));
        dispatch(setMessageUpdate(""));
    }

    async function updateCityDetails(): Promise<void> {
        const response = await updateCity(updateId, {
            name: nameUpdate,
            count: Number(countUpdate),
        });
        dispatch(setMessageUpdate(response));
        const responseGet = await getCities({ name: searchedFor, min, max });
        dispatch(setSearchedCities(responseGet.rows));
    }

    return (
        <>
            <h2 className="font-bold text-xl">Update City</h2>
            <form>
                <CityAutocomplete
                    autocomplete={cities}
                    inputValue={inputValue}
                    inputCallback={(value) => dispatch(setSearchedForUpdate(value))}
                ></CityAutocomplete>
                <Button
                    variant="contained"
                    type="button"
                    className="text-sm p-2 h-[40px] mt-2"
                    sx={buttonSx}
                    onClick={getCityDetails}
                >
                    Get details
                </Button>
                <div className="input-container flex flex-col my-2 lg:flex-row lg:items-center items-start lg:mr-2 w-[100%] lg:max-w-[300px]">
                    <label htmlFor="name" className="text-white whitespace-nowrap">
                        Name:
                    </label>
                    <input
                        value={nameUpdate}
                        placeholder="Your new city name"
                        type="string"
                        id="name"
                        className="border-2 border-green-700 focus:border-green-400 outline-none p-2 rounded-sm text-sm text-white lg:ml-2 w-[100%]"
                        onInput={async (event) =>
                            dispatch(setNameUpdate((event.target as HTMLInputElement).value))
                        }
                    />
                </div>
                <CountInput
                    label={"Count:"}
                    inputCallback={(value: string) => dispatch(setCountUpdate(value))}
                    value={countUpdate}
                    placeholder={"Your new  count"}
                ></CountInput>
                <Button
                    variant="contained"
                    type="button"
                    className="text-sm p-2 h-[40px] mt-2"
                    sx={buttonSx}
                    onClick={updateCityDetails}
                >
                    Update
                </Button>
                <div className="update-message-container mt-2">
                    <span className="update-message">{messageUpdate}</span>
                </div>
            </form>
        </>
    );
}

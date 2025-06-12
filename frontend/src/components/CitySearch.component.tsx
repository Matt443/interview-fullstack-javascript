import { Button } from "@mui/material";
import { CitySearchProps } from "../types/models.type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/state.store";
import { Input } from "./Input.component";
import { setMax, setMin, setSearchedFor } from "../features/counterSlice.feature";

const CitySearch: React.FC<CitySearchProps> = ({ searchCallback, cities, classes = "" }) => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state: RootState) => state.data.searchedFor);
    return (
        <div className={`${classes} search-container w-[100%]`}>
            <form
                className="items-center lg:items-center flex-col lg:flex-row flex-wrap flex w-[100%]"
                onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        await searchCallback(inputValue);
                    }
                }}
            >
                <Input
                    autocomplete={cities}
                    inputValue={inputValue}
                    inputCallback={(value) => dispatch(setSearchedFor(value))}
                ></Input>
                <div className="input-container flex flex-col lg:flex-row lg:items-center items-start lg:mr-2 w-[100%] lg:m-0 lg:max-w-[300px]">
                    <label htmlFor="count-min" className="text-white whitespace-nowrap">
                        Count min:
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="999999"
                        id="count-min"
                        className="border-2 border-green-700 focus:border-green-400 outline-none p-2 rounded-sm text-sm text-white lg:ml-2 w-[100%]"
                        onInput={(event) =>
                            dispatch(setMin((event.target as HTMLInputElement).value))
                        }
                    />
                </div>
                <div className="input-container flex flex-col lg:flex-row lg:items-center items-start lg:mr-2 w-[100%] lg:max-w-[300px]">
                    <label htmlFor="count-min" className="text-white whitespace-nowrap">
                        Count max:
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="999999"
                        id="count-min"
                        className="border-2 border-green-700 focus:border-green-400 outline-none p-2 rounded-sm text-sm text-white lg:ml-2 w-[100%]"
                        onInput={(event) =>
                            dispatch(setMax((event.target as HTMLInputElement).value))
                        }
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
                        "&:hover": { bgcolor: "transparent", color: "var(--color-green-400)" },
                    }}
                    onClick={async () => {
                        await searchCallback(inputValue);
                    }}
                >
                    Search
                </Button>
            </form>
        </div>
    );
};

export default CitySearch;

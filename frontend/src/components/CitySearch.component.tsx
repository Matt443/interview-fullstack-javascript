import { Autocomplete, Button } from "@mui/material";
import { CitySearchProps } from "../types/models.type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/state.store";
import { setSearchedFor } from "../features/counterSlice.feature";

const CitySearch: React.FC<CitySearchProps> = ({ searchCallback, cities, classes = "" }) => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state: RootState) => state.data.searchedFor);
    return (
        <div className={`${classes} search-container w-[100%]`}>
            <form
                className="items-center lg:items-start flex-col lg:flex-row flex w-[100%]"
                onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        await searchCallback(inputValue);
                    }
                }}
            >
                <label className="text-white lg:mr-2">
                    City name:{" "}
                    <Autocomplete
                        sx={() => ({
                            display: "inline-block",
                            ".MuiAutocomplete-input::placeholder": {
                                color: "var(--color-green-700)",
                            },
                            "& input": {
                                width: "100%",
                                bgcolor: "transparent",
                                color: "var(--color-white)",
                            },
                        })}
                        className="w-[100%] lg:w-fit"
                        options={cities}
                        value={inputValue}
                        onInputChange={(_e, value) => dispatch(setSearchedFor(value))}
                        renderInput={(params) => (
                            <div ref={params.InputProps.ref} className="w-[100%] mb-2">
                                <input
                                    type="text"
                                    {...params.inputProps}
                                    placeholder="Type your city"
                                    className="border-2 border-green-700 focus:border-green-400 outline-none p-2 rounded-sm text-sm"
                                />
                            </div>
                        )}
                    />
                </label>
                <Button
                    variant="contained"
                    type="button"
                    className="text-sm p-2 h-[40px]"
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

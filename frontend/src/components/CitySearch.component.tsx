import { Autocomplete, Button } from "@mui/material";
import { CitySearchProps } from "../types/models.type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/state.store";
import { setSearchedFor } from "../features/counterSlice.feature";

const CitySearch: React.FC<CitySearchProps> = ({ searchCallback, cities, classes = "" }) => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state: RootState) => state.data.searchedFor);
    return (
        <div className={`${classes} search-container`}>
            <form className="items-center flex">
                <label className="text-white">
                    City name:{" "}
                    <Autocomplete
                        sx={() => ({
                            display: "inline-block",
                            ".MuiAutocomplete-input::placeholder": {
                                color: "var(--color-green-700)",
                            },
                            "& input": {
                                width: 200,
                                bgcolor: "transparent",
                                color: "var(--color-white)",
                            },
                        })}
                        id="custom-input-demo"
                        options={cities}
                        value={inputValue}
                        onInputChange={(_e, value) => dispatch(setSearchedFor(value))}
                        renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                                <input
                                    type="text"
                                    {...params.inputProps}
                                    placeholder="Type your city"
                                    className="border-2 border-green-700 focus:border-green-400 outline-none p-2 rounded-sm mr-2 text-sm"
                                />
                            </div>
                        )}
                    />
                </label>
                <Button
                    variant="contained"
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
                    Contained
                </Button>
            </form>
        </div>
    );
};

export default CitySearch;

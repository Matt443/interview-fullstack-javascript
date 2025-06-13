import { Button } from "@mui/material";
import { CitySearchProps } from "../types/models.type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/state.store";
import { Input } from "./Input.component";
import { setMax, setMin, setSearchedFor } from "../features/stateSlice.feature";
import CountInput from "./CountInput.component";

const CitySearch: React.FC<CitySearchProps> = ({ searchCallback, cities, classes = "" }) => {
    const dispatch = useDispatch();
    const inputValue = useSelector((state: RootState) => state.data.searchedFor);
    const max = useSelector((state: RootState) => state.data.max);
    const min = useSelector((state: RootState) => state.data.min);
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
                <CountInput
                    label={"Count min:"}
                    inputCallback={(value: string) => dispatch(setMin(value))}
                    value={min}
                ></CountInput>
                <CountInput
                    label={"Count max:"}
                    inputCallback={(value: string) => dispatch(setMax(value))}
                    value={max}
                ></CountInput>
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
                    Update
                </Button>
            </form>
        </div>
    );
};

export default CitySearch;

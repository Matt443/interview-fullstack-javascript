import { Autocomplete } from "@mui/material";
interface InputProps {
    autocomplete: string[];
    inputValue: string;
    inputCallback: (value: string) => void;
}

const CityAutocomplete: React.FC<InputProps> = ({ inputValue, autocomplete, inputCallback }) => {
    return (
        <div className="input-container my-2 mr-2">
            <label className="text-white lg:mr-2 w-[100%] lg:max-w-[300px]">
                City name:
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
                    options={autocomplete}
                    value={inputValue}
                    onInputChange={(_e, value) => inputCallback(value)}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref} className="w-[100%]">
                            <input
                                type="text"
                                {...params.inputProps}
                                placeholder="Type your city"
                                className="border-2 mx-2 border-green-700 focus:border-green-400 outline-none p-2 rounded-sm text-sm w-[100%]"
                            />
                        </div>
                    )}
                />
            </label>
        </div>
    );
};

export default CityAutocomplete;

import { Autocomplete, TextField } from "@mui/material";
import { CitySearchProps } from "../types/models.type";

const CitySearch: React.FC<CitySearchProps> = ({ cities, classes = "" }) => {
    return (
        <>
            <Autocomplete
                disablePortal
                options={cities}
                className={classes}
                sx={{
                    width: "100%",
                    maxWidth: "300px",
                    "& label": { color: "var(--color-white)" },
                    "& .MuiSvgIcon-root": { color: "var(--color-white)" },
                    "& input": { borderColor: "var(--color-green-800)" },
                }}
                renderInput={(params) => <TextField {...params} label="Find your city" />}
            />
        </>
    );
};

export default CitySearch;

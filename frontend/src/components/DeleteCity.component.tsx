import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/state.store";
import { setSearchedCities } from "../features/stateSlice.feature";
import { deleteCities, getCities } from "../utils/api.util";
import { buttonSx } from "../constants/styles.constant";

export default function DeleteCity() {
    const toDelete = useSelector((state: RootState) => state.data.toDelete);
    const min = useSelector((state: RootState) => state.data.min);
    const max = useSelector((state: RootState) => state.data.max);

    const inputValue = useSelector((state: RootState) => state.data.searchedFor);
    const dispatch = useDispatch();

    async function deleteHandler(): Promise<void> {
        await deleteCities(toDelete);
        const response = await getCities({ name: inputValue, min, max });
        dispatch(setSearchedCities(response.rows));
    }
    return (
        <>
            <Button
                variant="contained"
                type="button"
                className="text-sm p-2 h-[40px] mt-2"
                sx={buttonSx}
                onClick={deleteHandler}
            >
                Delete selected city
            </Button>
        </>
    );
}

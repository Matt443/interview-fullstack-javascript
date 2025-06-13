import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { RootState } from "../stores/state.store";
import { useSelector } from "react-redux";
import { buttonSx } from "../constants/styles.constant";

interface PaginationProps {
    page: number;
    previousCallback: () => void;
    nextCallback: () => void;
    perPageCallback: (event: SelectChangeEvent<string>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    previousCallback,
    nextCallback,
    perPageCallback,
}) => {
    const perPage = useSelector((state: RootState) => state.data.perPage);

    return (
        <div className="pagination-container flex align-center">
            <Button
                variant="contained"
                type="button"
                className="text-sm p-2 h-[40px] mt-2"
                sx={buttonSx}
                onClick={() => previousCallback()}
            >
                Previous
            </Button>
            <span className="text-white mx-2 flex items-center">{page}</span>
            <Button
                variant="contained"
                type="button"
                className="text-sm p-2 h-[40px] mt-2"
                sx={buttonSx}
                onClick={() => nextCallback()}
            >
                Next
            </Button>
            <div className="per-page-container mx-2">
                <span>Per page</span>
                <Select
                    sx={{
                        bgcolor: "var(--color-green-400)",
                        "& .MuiSelect-select": {
                            padding: "calc(var(--spacing) * 2)",
                        },
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={perPage.toString()}
                    label="Per Page"
                    className="mx-2"
                    onChange={perPageCallback}
                >
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="25">25</MenuItem>
                    <MenuItem value="100">100</MenuItem>
                </Select>
            </div>
        </div>
    );
};

export default Pagination;

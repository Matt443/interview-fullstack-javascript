import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { RootState } from "../stores/state.store";
import { useSelector } from "react-redux";

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
        <div className="pagination-container">
            <Button onClick={() => previousCallback()}>Previous</Button>
            <span className="text-white">{page}</span>
            <Button onClick={() => nextCallback()}>Next</Button>
            <Select
                sx={{
                    bgcolor: "var(--color-white)",
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={perPage.toString()}
                label="Per Page"
                onChange={perPageCallback}
            >
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="100">100</MenuItem>
            </Select>
        </div>
    );
};

export default Pagination;

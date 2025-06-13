import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { setToDelete } from "../features/stateSlice.feature";

interface DataTableProps {
    columns: GridColDef[];
    rows: object[];
    checkboxSelection: boolean;
    children?: React.ReactNode;
}

const tableCSS = {
    border: 0,
    maxWidth: "100%",
    "& .MuiTablePagination-root, & div.MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader, & div.MuiDataGrid-columnHeaders .MuiDataGrid-filler, & .MuiDataGrid-overlay":
        { bgcolor: "black", color: "white" },
    "& .MuiTablePagination-root svg": { color: "white" },
    "& div.MuiDataGrid-virtualScrollerRenderZone": {
        bgcolor: "black",
        color: "white",
    },
    "& .MuiCheckbox-root svg": {
        color: "var(--color-green-400)",
    },
    "& .MuiDataGrid-row:hover, & .MuiDataGrid-row.Mui-selected": {
        bgcolor: "var(--color-green-900)",
    },
    "& .MuiDataGrid-row.Mui-selected:hover": {
        bgcolor: "var(--color-green-700)",
    },
    "& .MuiDataGrid-footerContainer": {
        display: "none",
    },
};

const DataTable: React.FC<DataTableProps> = ({ columns, rows, checkboxSelection, children }) => {
    const dispatch = useDispatch();

    async function modelChangeHandler(selection: { type: string; ids: Set<GridRowId> }) {
        dispatch(setToDelete(Array.from(selection.ids).map(String)));
    }
    return (
        <>
            <DataGrid
                sx={tableCSS}
                rows={rows}
                columns={columns}
                checkboxSelection={checkboxSelection}
                onRowSelectionModelChange={modelChangeHandler}
            />
            {children}
        </>
    );
};

export default DataTable;

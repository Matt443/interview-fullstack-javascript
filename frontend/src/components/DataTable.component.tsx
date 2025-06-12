import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataTableProps {
    columns: GridColDef[];
    rows: object[];
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
};

const DataTable: React.FC<DataTableProps> = ({ columns, rows }) => {
    console.log(rows);
    const paginationModel = { page: 0, pageSize: rows.length || 100 };
    return (
        <>
            <DataGrid
                sx={tableCSS}
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                checkboxSelection={false}
                // onRowSelectionModelChange={(newSelection) => {console.log(newSelection)}}
            />
        </>
    );
};

export default DataTable;

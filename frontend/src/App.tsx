import TopBar from "./components/TopBar.component";
import { useLazyGetAllCitiesQuery, useLazyGetCitiesQuery } from "./features/ApiSlice.feature";
import { useSelector } from "react-redux";
import { RootState } from "./stores/state.store";
import { useEffect } from "react";
import DataTable from "./components/DataTable.component";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "name", headerName: "name", width: 200 },
    { field: "username", headerName: "username", width: 100 },
];

function App() {
    const [loadCities, { data: cities }] = useLazyGetCitiesQuery();
    const [loadAllCities, { data: allCities }] = useLazyGetAllCitiesQuery();

    const inputValue = useSelector((state: RootState) => state.data.searchedFor);

    useEffect(() => {
        loadAllCities();
    }, [loadAllCities]);
    return (
        <>
            <TopBar
                searchCallback={() => loadCities({ name: inputValue })}
                cities={Array.isArray(allCities) ? allCities.map((item) => item.name) : []}
            ></TopBar>
            <DataTable rows={cities ? cities : []} columns={columns}></DataTable>
        </>
    );
}

export default App;

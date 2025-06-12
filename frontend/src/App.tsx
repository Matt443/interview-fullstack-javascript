import TopBar from "./components/TopBar.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./stores/state.store";
import { useEffect } from "react";
import DataTable from "./components/DataTable.component";
import { GridColDef } from "@mui/x-data-grid";
import { setAllCities, setSearchedCities } from "./features/counterSlice.feature";
import { City } from "./types/models.type";
import axios from "axios";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "cityname", headerName: "name", width: 200 },
    { field: "count", headerName: "count", width: 100 },
];

async function getCities(name: string = ""): Promise<City[]> {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/cities?name=${name}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

function App() {
    const available = useSelector((state: RootState) => state.data.available);
    const searchedCities = useSelector((state: RootState) => state.data.searchedCities);
    const dispatch = useDispatch();

    const inputValue = useSelector((state: RootState) => state.data.searchedFor);

    useEffect(() => {
        const getData = async () => {
            dispatch(setAllCities((await getCities("")).map((element: City) => element.cityname)));
            dispatch(setSearchedCities(await getCities("")));
        };
        getData();
    }, [dispatch]);

    return (
        <>
            <TopBar
                searchCallback={async () => {
                    dispatch(setSearchedCities(await getCities(inputValue)));
                }}
                cities={available}
            ></TopBar>
            <DataTable rows={searchedCities} columns={columns}></DataTable>
        </>
    );
}

export default App;

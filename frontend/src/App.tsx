import TopBar from "./components/TopBar.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./stores/state.store";
import DataTable from "./components/DataTable.component";
import { GridColDef } from "@mui/x-data-grid";
import {
    setAllCities,
    setPage,
    setPerPage,
    setSearchedCities,
} from "./features/counterSlice.feature";
import { City } from "./types/models.type";
import axios from "axios";
import Pagination from "./components/Pagination.component";
import { isInRange } from "./utils/common";
import { SelectChangeEvent } from "@mui/material";
import { useEffect } from "react";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "cityname", headerName: "name", width: 200 },
    { field: "count", headerName: "count", width: 100 },
];

async function getCities(
    name: string = "",
    page: number = 1,
    perPage: number = 10,
): Promise<City[]> {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/v1/cities?name=${name}&page=${page}&perPage=${perPage}`,
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

function App() {
    const available = useSelector((state: RootState) => state.data.available);
    const searchedCities = useSelector((state: RootState) => state.data.searchedCities);
    const page = useSelector((state: RootState) => state.data.page);
    const dispatch = useDispatch();

    const inputValue = useSelector((state: RootState) => state.data.searchedFor);

    useEffect(() => {
        const getData = async () => {
            dispatch(setAllCities((await getCities("")).map((element: City) => element.cityname)));
            dispatch(setSearchedCities(await getCities("")));
        };
        getData();
    }, [dispatch]);

    function changePage(next: number = 1) {
        const askedPage = page + 1 * next;
        const changeAllowed = isInRange(askedPage, 1, 10);

        if (!changeAllowed) return;

        const pageToSet = changeAllowed ? askedPage : page;
        const fn = async () => {
            const response = await getCities(undefined, pageToSet, undefined);
            dispatch(setSearchedCities(response));
        };
        fn();
        dispatch(setPage(pageToSet));
    }
    function changePerPage(value: number) {
        dispatch(setPerPage(value));
        dispatch(setPage(1));
        const fn = async () => {
            const response = await getCities(undefined, page, value);
            dispatch(setSearchedCities(response));
        };
        fn();
    }

    return (
        <>
            <TopBar
                searchCallback={async () => {
                    dispatch(setSearchedCities(await getCities(inputValue)));
                }}
                cities={available}
            ></TopBar>
            <DataTable rows={searchedCities} columns={columns}></DataTable>
            <Pagination
                page={page}
                nextCallback={() => {
                    changePage(1);
                }}
                previousCallback={() => {
                    changePage(-1);
                }}
                perPageCallback={(event: SelectChangeEvent<string>) =>
                    changePerPage(Number(event.target.value))
                }
            ></Pagination>
        </>
    );
}

export default App;

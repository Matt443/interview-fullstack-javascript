/* eslint-disable react-hooks/exhaustive-deps */
import { SelectChangeEvent } from "@mui/material";
import TopBar from "../components/TopBar.component";
import {
    setAllCities,
    setPage,
    setPagesQuantity,
    setPerPage,
    setSearchedCities,
} from "../features/stateSlice.feature";
import { getAutocomplete, getCities } from "../utils/api.util";
import DataTable from "../components/DataTable.component";
import Pagination from "../components/Pagination.component";
import { useEffect } from "react";
import { isInRange } from "../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/state.store";
import { GridColDef } from "@mui/x-data-grid";
import DeleteCity from "./DeleteCity.component";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "name", width: 200 },
    { field: "count", headerName: "count", width: 100 },
];

interface CityPresentation {
    children?: React.ReactNode;
    checkboxSelection: boolean;
}
const CityPresentation: React.FC<CityPresentation> = ({ children, checkboxSelection = false }) => {
    const available = useSelector((state: RootState) => state.data.available);
    const searchedCities = useSelector((state: RootState) => state.data.searchedCities);
    const perPage = useSelector((state: RootState) => state.data.perPage);
    const pagesQuantity = useSelector((state: RootState) => state.data.pagesQuantity);
    const min = useSelector((state: RootState) => state.data.min);
    const max = useSelector((state: RootState) => state.data.max);
    const page = useSelector((state: RootState) => state.data.page);

    const dispatch = useDispatch();

    const inputValue = useSelector((state: RootState) => state.data.searchedFor);

    useEffect(() => {
        const getData = async () => {
            const responseAutocomplete = await getAutocomplete();
            dispatch(setAllCities(responseAutocomplete));
            const response = await getCities({});
            dispatch(setSearchedCities(response.rows));
            dispatch(setPagesQuantity(Math.ceil(response.foundAtAll / perPage)));
        };
        getData();
    }, []);

    function changePage(next: number = 1) {
        const askedPage = page + 1 * next;
        const changeAllowed = isInRange(askedPage, 1, pagesQuantity);

        if (!changeAllowed) return;

        const pageToSet = changeAllowed ? askedPage : page;
        const fn = async () => {
            const response = await getCities({
                name: inputValue,
                page: pageToSet,
                perPage,
                min,
                max,
            });
            dispatch(setSearchedCities(response.rows));
            dispatch(setPagesQuantity(Math.ceil(response.foundAtAll / perPage)));
        };
        fn();
        dispatch(setPage(pageToSet));
    }
    function changePerPage(value: number) {
        dispatch(setPerPage(value));
        dispatch(setPage(1));
        const fn = async () => {
            const response = await getCities({
                name: inputValue,
                page: 1,
                perPage: value,
                min,
                max,
            });
            dispatch(setSearchedCities(response.rows));
            dispatch(setPagesQuantity(Math.ceil(response.foundAtAll / value)));
        };
        fn();
    }

    async function searchHandler(): Promise<void> {
        const response = await getCities({ name: inputValue, min, max, perPage });
        dispatch(setSearchedCities(response.rows));
        dispatch(setPagesQuantity(Math.ceil(response.foundAtAll / perPage)));
    }

    return (
        <>
            <TopBar searchCallback={searchHandler} cities={available}></TopBar>
            <DataTable
                rows={searchedCities}
                columns={columns}
                checkboxSelection={checkboxSelection}
            >
                <div className="after-table-container flex align-center justify-between">
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
                    <DeleteCity></DeleteCity>
                </div>
            </DataTable>
            <div className="slot-contanier">{children}</div>
        </>
    );
};

export default CityPresentation;

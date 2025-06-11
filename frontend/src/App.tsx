import TopBar from "./components/TopBar.component";
import { useLazyGetAllCitiesQuery, useLazyGetCitiesQuery } from "./features/ApiSlice.feature";
import { useSelector } from "react-redux";
import { RootState } from "./stores/state.store";
import { useEffect } from "react";

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
            <ul className="text-white">
                {cities?.map((user) => (
                    <li className="text-green" key={user.name}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default App;

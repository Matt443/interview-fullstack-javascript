import CitySearch from "./CitySearch.component";
const cities = ["The Godfather", "Pulp Fiction"];

const TopBar = () => {
    return (
        <nav className="flex py-4 px-2 w-[100%] position-fixed justify-start">
            <CitySearch cities={cities}></CitySearch>
        </nav>
    );
};

export default TopBar;

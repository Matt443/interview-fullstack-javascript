import CitySearch from "./CitySearch.component";

interface TopBarProps {
    searchCallback: (query: string) => void;
    cities: string[];
}
const TopBar: React.FC<TopBarProps> = ({ searchCallback, cities }) => {
    return (
        <nav className="flex py-4 px-2 w-[100%] position-fixed justify-start">
            <CitySearch searchCallback={searchCallback} cities={cities}></CitySearch>
        </nav>
    );
};

export default TopBar;

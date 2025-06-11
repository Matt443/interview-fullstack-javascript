export interface CitySearchProps {
    classes?: string;
    cities: string[];
    searchCallback: (query: string) => void;
}

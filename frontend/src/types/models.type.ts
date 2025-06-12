export interface CitySearchProps {
    classes?: string;
    cities: string[];
    searchCallback: (query: string) => void;
}

export interface City {
    cityname: string;
    count: number;
    id: string;
}

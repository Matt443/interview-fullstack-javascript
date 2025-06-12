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

export interface CityQueryParams {
    name?: string;
    count?: number;
    id?: string;
    perPage?: number;
    page?: number;
    min?: string;
    max?: string;
}

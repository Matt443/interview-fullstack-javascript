import CityPresentation from "../components/CityPresentation.component";
import Nav from "../components/Nav.component";

export default function Index() {
    return (
        <>
            <Nav></Nav>
            <main className="text-white p-2">
                <CityPresentation checkboxSelection={false}></CityPresentation>
            </main>
        </>
    );
}

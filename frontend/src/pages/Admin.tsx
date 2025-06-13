import AddCity from "../components/AddCity.component";
import CityPresentation from "../components/CityPresentation.component";
import Nav from "../components/Nav.component";
import UpdateCity from "../components/UpdateCity.component";

export default function Admin() {
    return (
        <>
            <Nav></Nav>
            <main className="text-white p-2">
                <CityPresentation checkboxSelection={true}>
                    <AddCity></AddCity>
                    <UpdateCity></UpdateCity>
                </CityPresentation>
            </main>
        </>
    );
}

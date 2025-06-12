import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <ul className="flex text-white">
                <Link to={"/admin"} className="p-2">
                    Admin
                </Link>
                <Link to={"/"} className="p-2">
                    Home
                </Link>
            </ul>
        </nav>
    );
}

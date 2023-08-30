import Header from "../Header/Header";
import Routing from "../Routes/Routes";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
                <Header />
            <div className="container">
                <Routing />
            </div>
        </div>
    );
}

export default Layout;

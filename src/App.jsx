import "./App.css";
import MainBody from "./MainBody";
import Header from "./Header";

export default function App() {
  return (
    <div className="container-fluid p-0 m-0 App">
      <div className="row p-0 m-0">
        <div className="left-column col-lg-6  d-flex flex-column overflow-auto vh-100">
          <div className="align-content-center vh-100">
            <MainBody />
          </div>
          <Header />
        </div>

        <div className="right-column d-flex col-lg-6 flex-column vh-100 "></div>
      </div>
    </div>
  );
}

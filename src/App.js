import "./App.css";
import MainBody from "./MainBody";
import Header from "./Header";

export default function App() {
  return (
    <div className="container-fluid p-0 m-0 App row d-flex h-100">
      <div className="col-lg-6 d-flex left-column p-0">
        <img
          className="d-none d-lg-block"
          src="/imgs/sarah_shekinah.jpg"
          alt="img"
        />
        <img
          className="d-lg-none d-sm-block"
          src="/imgs/sarah_shekinah_mobile.jpg"
          alt="img"
        />
      </div>
      <div className="right-column card col-lg-6 d-flex align-self-center">
        <Header />
        <MainBody />
      </div>
    </div>
  );
}

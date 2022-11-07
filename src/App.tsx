import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./views/MainPage/MainPage";
import { RedirectPage } from "./views/RedirectPage/RedirectPage";
import { Page404 } from "./views/404/Page404";
function App() {
  return (
    <div className="appContainer">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="/:index" element={<RedirectPage />} />
      </Routes>
    </div>
  );
}

export default App;

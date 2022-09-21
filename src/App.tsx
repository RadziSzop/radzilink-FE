import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./views/MainPage/MainPage";
function App() {
  return (
    <div className="appContainer">
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Test } from "./views/MainPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Search from './pages/Search';
import ImageDetail from "./pages/ImageDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Search />}/>
          <Route path="/image-detail" element={ <ImageDetail />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

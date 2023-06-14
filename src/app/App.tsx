import {Routes, Route} from "react-router-dom";
import GetListRace from "../components/GetListRace"
import ChartRace from "../components/ChartRace";
const App = () => {
 return (
  <div className="App">
    <Routes>
      <Route path="/" element={<GetListRace/>}/>
      <Route path="/chart/race" element={<ChartRace/>}/>
    </Routes>
  </div>
 );
}

export default App;

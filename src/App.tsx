import "./App.css";
import { Home } from "./components/Home";
import { ScoreProvider } from "./contexts/ScoreProvider";

function App() {
  return (
    <div className="App">
      <ScoreProvider>
        <Home />
      </ScoreProvider>
    </div>
  );
}

export default App;

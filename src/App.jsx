// App.jsx
import { Chart } from "./components/Chart/Chart";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import { useChartData } from "./hooks/useChartData";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />

      <main className="main-content">
        <div className="container">
          <Chart />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

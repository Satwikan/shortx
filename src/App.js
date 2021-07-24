import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Forward from "./pages/Forward";
import NotFound from "./pages/NotFound";
import AllUrls from "./pages/AllUrls";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/error" component={NotFound} />
          <Route exact path="/all" component={AllUrls} />
          <Route exact path="/l/:code" component={Forward} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

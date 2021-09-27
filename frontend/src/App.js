import "./App.css";
import "tailwindcss/tailwind.css";
import NavBar from "./Components/Nav";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Dashboard from "./Pages/Dashboard";
import Petition from "./Pages/Petition";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/petition/:petition_id" exact>
          <Petition />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/explore" exact>
          <Explore />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

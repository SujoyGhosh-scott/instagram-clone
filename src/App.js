import './App.css';
import { Switch, Route } from 'react-router-dom';
import Feed from "./components/Feed/Feed"
import Messages from "./components/Messages/Messages"
import Profile from "./components/Profile/Profile"
import Login from "./components/Login/Login"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Feed} />
        <Route path="/messages" component={Messages} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;

import './App.css';
import Header from './Header';
import Types from './Types';
import Quiz from './Quiz';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={Types} />
          <Route path="/quiz" component={Quiz}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

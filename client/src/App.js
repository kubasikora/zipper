import React, {Component} from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import {BrowserRouter, Switch, Route} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "not logged"
    };
  }

  componentDidMount() {
    axios
      .get("/api/isLogged")
      .then(response => {
        console.log("success");
        this.setState({display: response.data});
      })
      .catch(err => {
        console.log("error");
        this.setState({display: err.response.data});
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route path="/home" exact render={() => <h2> Hello </h2>} />
            <Route path="/badLogin" exact render={()=><h2> zle haslo </h2>} />
          </Switch>
        </BrowserRouter>
        <p>{JSON.stringify(this.state.display)}</p>
        <button
          onClick={() =>
            axios
              .get("/api/teams")
              .then(response => {
                console.log("success");
                this.setState({display: response.data});
              })
              .catch(err => {
                console.log("error");
                this.setState({display: err});
              })
          }
        >
          Nigga
        </button>
        <form action="/login" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" />
          </div>
          <div>
            <input type="submit" value="Log In" />
          </div>
        </form>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react'
import Header from './components/Header'
import GlobalStyle from './styles/global'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from './components/Landing'
import Products from './components/Products'
import Admin from './components/Admin'
import About from './components/About'
import Contact from './components/Contact'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <GlobalStyle/>
          <Header/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/products" component={Products} />
            <Route path="/admin" component={Admin} />
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App

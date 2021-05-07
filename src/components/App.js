import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Login from './Login' 

class App extends Component{

  render() {
    return (
        <Router>
          <Fragment>
            <LoadingBar />
            <div>
              { this.props.loggedInUser ? null : 
                <Route path='/' exact component={Login} />
              }
            </div>
          </Fragment>
        </Router>
      );
  }
}

function mapStateToProps({loggedInUser}) {
  return {
    loggedIn: loggedInUser !== null
  }
}

export default connect(mapStateToProps)(App);

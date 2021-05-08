import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Login from './Login' 
import Navigation from './Navigation'
import { handleInitialData } from '../actions/shared'
import Questions from './Questions'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { loggedIn } = this.props;

    return (
        <Router>
          <Fragment>
            <LoadingBar />
              <Navigation />
              <Login showModal={!this.props.loggedIn}/>
              { loggedIn ? <Questions /> : null}
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

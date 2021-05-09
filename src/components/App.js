import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Login from './Login' 
import Navigation from './Navigation'
import { handleInitialData } from '../actions/shared'
import Questions from './Questions'
import Question from './Question'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { loggedIn } = this.props;

    return (
        <Router>
          <Fragment>
              <Navigation />
              <Login showModal={!loggedIn}/>
              { loggedIn ?
                <div>
                  <Route path='/' exact component={Questions} />
                  <Route path='/leaderboard' exact component={Leaderboard} />
                  <Route path='/add' exact component={NewQuestion} />
                  <Route path='/question/:id' component={Question} />
                </div>
                :
              null }
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

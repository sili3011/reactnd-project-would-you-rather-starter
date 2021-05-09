import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Questions extends Component {
  render() {
    const { answered, unanswered } = this.props;

    return (
      <div style={{margin: '2em 10em'}}>
        <Tabs defaultActiveKey="unanswered">
          <Tab eventKey="unanswered" title="Unanswered questions">
            <ul>
              { unanswered.map(q => (
              <li key={q.id}>
                <Link to={`/question/${q.id}`}>{q.id}</Link>
              </li>)) }
            </ul>
          </Tab>
          <Tab eventKey="answered" title="Answered questions">
            <ul>
              { answered.map(q => (
              <li key={q.id}>
                <Link to={`/question/${q.id}`}>{q.id}</Link>
              </li>)) }
            </ul>
          </Tab>
        </Tabs>
      </div>
      );
  }
}

function mapStateToProps({loggedInUser, questions}) {
  let answered = [];
  let unanswered = [];

  if(questions) {
    const qs = Object.values(questions).sort((a, b) => questions[b.id].timestamp - questions[a.id].timestamp);
    answered = qs.filter(q => q.optionOne.votes.includes(loggedInUser) || q.optionTwo.votes.includes(loggedInUser));
    unanswered = qs.filter(q => !q.optionOne.votes.includes(loggedInUser) && !q.optionTwo.votes.includes(loggedInUser));
  }

  return {
    answered: answered,
    unanswered: unanswered
  }
}

export default connect(mapStateToProps)(Questions);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab, Card, Row, Col, ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Questions extends Component {
  renderList(list = [], answered = false) {
    return(
      <div>
      { list.map(q => (
          <Link key={q.id} to={`/question/${q.id}`} style={{textDecoration: 'none', color: 'black'}}>                              
            <Card className='question'>
                <Card.Header>
                  <span><b>{q.author}</b> asked the question: <b> Would you rather ... ? </b></span>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <span><b>A: </b>{q.optionOne.text}</span>
                    </Col>
                    <Col>
                      <span><b>B: </b>{q.optionTwo.text}</span>
                    </Col>
                  </Row>
                </Card.Body>
                { answered && 
                  <Card.Footer>
                    <ProgressBar>
                      <ProgressBar variant='success' now={(q.optionOne.votes.length / (q.optionOne.votes.length + q.optionTwo.votes.length))*100} key={1} label={`A: ${((q.optionOne.votes.length / (q.optionOne.votes.length + q.optionTwo.votes.length))*100).toFixed(2)}% (${q.optionOne.votes.length})`} />
                      <ProgressBar variant='danger' now={(q.optionTwo.votes.length / (q.optionOne.votes.length + q.optionTwo.votes.length))*100} key={2} label={`B: ${((q.optionTwo.votes.length / (q.optionOne.votes.length + q.optionTwo.votes.length))*100).toFixed(2)}% (${q.optionTwo.votes.length})`}/>
                    </ProgressBar>
                  </Card.Footer>
                } 
            </Card>
          </Link>)) }
      </div>
    );
  }

  render() {
    const { answered, unanswered, user } = this.props;

    return (
      <div style={{margin: '2em 10em'}}>
        <h3 style={{marginBottom: '2em'}}>Hi <b>{user}</b>! Lets get going!</h3>
        <Tabs defaultActiveKey="unanswered">
          <Tab eventKey='unanswered' title='Unanswered questions'>
            {this.renderList(unanswered)}
            <div style={{color: 'grey', margin: '2em auto', display: 'table'}}>
            {unanswered.length > 0 ? 
            <span>You have answered {answered.length} of {unanswered.length + answered.length} questions</span> :
            <span style={{fontSize: '20px'}}><b>You have answered all existing questions! Good job :) Maybe you should aks some more?</b></span>
            }</div>
          </Tab>
          <Tab eventKey='answered' title='Answered questions'>
            {this.renderList(answered, true)}
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
    unanswered: unanswered,
    user: loggedInUser
  }
}

export default connect(mapStateToProps)(Questions);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Alert, Row, Col, Form, Button, ProgressBar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { addAnswer } from '../actions/questions'
import { OPTION_NONE, OPTION_ONE, OPTION_TWO } from '../utils/ENUMS'
import { checkURL } from '../utils/helpers'

class Question extends Component {

    state = {
        selected: OPTION_NONE
    }

    componentDidMount() {
        this.setState(() => ({
            selected: this.props.answered,
            showStats: false
        }));
    }


    onSubmit = (e) => {
        const {dispatch, id, user} = this.props;
        e.preventDefault();
        dispatch(addAnswer({id, answer: this.state.selected, user: user.id}));
        this.setState(() => ({
            showStats: true
        }));
    }

    onSelect = (e, input) => {
        if(this.props.answered === OPTION_NONE && !this.state.showStats) {
            this.setState(() => ({
                selected: input
            }));
        }
    }

    render() {

        const { question, id, users, answered } = this.props;

        return (
            <div>
                { question !== undefined ?
                    <div style={{margin: '2rem'}}>
                        <h1>
                            <img src={checkURL(users[question.author].avatarURL)} width='70px' style={{borderRadius: '35px', marginRight: '10px'}}/>
                            {question.author} asked: <b>Would you rather ... ?</b>
                        </h1>
                        <Row style={{margin: '2rem'}}>
                            <Col onClick={(e) => this.onSelect(e, OPTION_ONE)}>
                                <Card>
                                    <Card.Body style={{backgroundColor: answered && this.state.selected === OPTION_ONE ? 'lightblue' : 'white'}}>
                                        <Form.Check label={question.optionOne.text} name="group1" type='radio' checked={this.state.selected === OPTION_ONE} readOnly/>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md='auto' style={{display: 'flex', alignItems: 'center'}}>vs</Col>
                            <Col>
                                <Card onClick={(e) => this.onSelect(e, OPTION_TWO)}>
                                    <Card.Body style={{backgroundColor: answered && this.state.selected === OPTION_TWO ? 'lightblue' : 'white'}}>
                                        <Form.Check label={question.optionTwo.text} name="group1" type='radio' checked={this.state.selected === OPTION_TWO} readOnly/>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        { (answered !== OPTION_NONE) || this.state.showStats ? 
                        <ProgressBar style={{margin: '2rem 4rem'}}>
                            <ProgressBar variant='success' now={(question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))*100} key={1} label={`A: ${((question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))*100).toFixed(2)}% (${question.optionOne.votes.length})`} />
                            <ProgressBar variant='danger' now={(question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))*100} key={2} label={`B: ${((question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))*100).toFixed(2)}% (${question.optionTwo.votes.length})`}/>
                        </ProgressBar> :
                        <div><Button style={{margin: '0 auto', display: 'block'}} onClick={this.onSubmit} disabled={this.state.selected === 0}>Submit</Button></div>}
                    </div> :     
                    <Alert variant={'danger'}>
                        The question with id <b>{id}</b> doesnt exist yet! Maybe you can help formulate it?
                    </Alert>
                }</div>
            );
    }
}

function mapStateToProps({questions, loggedInUser, users}, ownProps) {
    const id = ownProps.match.params.id;
    const question = questions[id]
    return {
        question: question,
        id: id,
        user: users[loggedInUser],
        users: users,
        answered: question ? ((question.optionOne.votes.includes(loggedInUser) ? OPTION_ONE : question.optionTwo.votes.includes(loggedInUser) ? OPTION_TWO : OPTION_NONE)) : null
    }
}

export default withRouter(connect(mapStateToProps)(Question));

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Alert, Row, Col, Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { addAnswer } from '../actions/questions'
import { OPTION_NONE, OPTION_ONE, OPTION_TWO } from '../utils/ENUMS'

class Question extends Component {

    state = {
        selected: OPTION_NONE
    }

    componentDidMount() {
        this.setState(() => ({
            selected: this.props.answered
        }));
    }


    onSubmit = (e) => {
        const {dispatch, id, user} = this.props;
        e.preventDefault();
        dispatch(addAnswer({id, answer: this.state.selected, user}));
    }

    onSelect = (e, input) => {
         this.setState(() => ({
            selected: input
        }));
    }

    render() {

        const { question, id } = this.props;

        return (
            
            <div>
                { question !== undefined ?
                    <div style={{margin: '2rem'}}>
                        <h1>Would you rather ... ?</h1>
                        <Row style={{margin: '2rem'}}>
                            <Col onClick={(e) => this.onSelect(e, OPTION_ONE)}>
                                <Card>
                                    <Card.Body>
                                        <Form.Check label={question.optionOne.text} name="group1" type='radio' checked={this.state.selected === OPTION_ONE} readOnly/>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md='auto' style={{display: 'flex', alignItems: 'center'}}>vs</Col>
                            <Col>
                                <Card onClick={(e) => this.onSelect(e, OPTION_TWO)}>
                                    <Card.Body>
                                        <Form.Check label={question.optionTwo.text} name="group1" type='radio' checked={this.state.selected === OPTION_TWO} readOnly/>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <div><Button style={{margin: '0 auto', display: 'block'}} onClick={this.onSubmit} disabled={this.state.selected === 0}>Submit</Button></div>
                    </div> :     
                    <Alert variant={'danger'}>
                        The question with id <b>{id}</b> doesnt exist yet! Maybe you can help formulate it?
                    </Alert>
                }</div>
            );
    }
}

function mapStateToProps({questions, loggedInUser}, ownProps) {
    const id = ownProps.match.params.id;
    const question = questions[id]
    return {
        question: question,
        id: id,
        user: loggedInUser,
        answered: question.optionOne.votes.includes(loggedInUser) ? OPTION_ONE : question.optionTwo.votes.includes(loggedInUser) ? OPTION_TWO : OPTION_NONE
    }
}

export default withRouter(connect(mapStateToProps)(Question));

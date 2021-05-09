import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { OPTION_ONE, OPTION_TWO } from '../utils/ENUMS'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {

    state = {
        toHome: false,
        inputOne: '',
        inputTwo: '',
    }

    handleChange = (e, option) => {
        const input = e.target.value;

        if(option === OPTION_ONE) {
             this.setState(() => ({
                inputOne: input
            }));
        }

        if(option === OPTION_TWO) {
            this.setState(() => ({
                inputTwo: input
            }));
        }
    }

    onSubmit = (e) => {
        const {dispatch, user} = this.props;
        const {inputOne, inputTwo} = this.state;
        e.preventDefault();
        dispatch(handleAddQuestion({optionOneText: inputOne, optionTwoText: inputTwo, author: user}));
        this.setState(() => ({
            toHome: true
        }));
    }

    render() {
        const {inputOne, inputTwo} = this.state;
        
        if(this.state.toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <div style={{margin: '2rem'}}>
                    <h1>Would you rather ... ?</h1>
                    <Row style={{margin: '2rem'}}>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <input placeholder="Answer one" value={inputOne} onChange={(event) => this.handleChange(event, OPTION_ONE)} style={{margin: '2em', width: '75%'}}/>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md='auto' style={{display: 'flex', alignItems: 'center'}}>vs</Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <input placeholder="Answer two" value={inputTwo} onChange={(event) => this.handleChange(event, OPTION_TWO)} style={{margin: '2em', width: '75%'}}/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <div><Button style={{margin: '0 auto', display: 'block'}} onClick={this.onSubmit} disabled={this.state.selected === 0}>Submit</Button></div>
                </div>
            </div>
            );
    }
}

function mapStateToProps({loggedInUser}) {
    return {
        user: loggedInUser
    }
}

export default connect(mapStateToProps)(NewQuestion);

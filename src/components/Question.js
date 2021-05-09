import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Alert, Row, Col, Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class Question extends Component {
  render() {

    const { question, id } = this.props;

    return (
         
        <div>
            { question !== undefined ?
                <div style={{margin: '2rem'}}>
                    <h1>Would you rather ... ?</h1>
                    <Row style={{margin: '2rem'}}>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Form.Check label={question.optionOne.text} name="group1" type='radio' />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md='auto' style={{display: 'flex', alignItems: 'center'}}>vs</Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Form.Check label={question.optionOne.text} name="group1" type='radio' />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <div><Button style={{margin: '0 auto', display: 'block'}}>Submit</Button></div>
                </div> :     
                <Alert variant={'danger'}>
                    The question with id <b>{id}</b> doesnt exist yet! Maybe you can help formulate it?
                </Alert>
            }</div>
        );
  }
}

function mapStateToProps({questions}, ownProps) {
    const id = ownProps.match.params.id;
    return {
        question: questions[id],
        id: id
    }
}

export default withRouter(connect(mapStateToProps)(Question));

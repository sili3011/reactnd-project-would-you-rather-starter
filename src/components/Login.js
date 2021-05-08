import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/loggedInUser.js'
import { Modal, Button } from 'react-bootstrap'

class Login extends Component {

    state = {
        input: '',
        showWarning: false
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state.input));
    }

    handleChange = (e) => {
        const input = e.target.value;

        this.setState(() => ({
            input
        }));
    }

    onHide = () => {
        this.setState(() => ({
            showWarning: true
        }));
    }

    render() {
        const { showWarning } = this.state;
        return (
            <Modal show={this.props.showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={this.onHide}
                >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{alignSelf: 'center', width: '100%'}}>
                    { !showWarning ? null : <p style={{color: 'red'}}>Sorry! No escape! You gotta login first ;)</p> }
                    <div>
                        <input placeholder="Your user name" value={this.state.input} onChange={this.handleChange} style={{margin: '2em', width: '75%'}}/>
                        <Button variant="primary" onClick={this.handleLogin}>Login</Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

// eslint-disable-next-line no-empty-pattern
function mapStateToProps({}, {showModal}) {
    return {
        showModal: showModal
    }
}

export default connect(mapStateToProps)(Login);
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/loggedInUser.js'
import { Modal, Button, Alert } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

class Login extends Component {

    state = {
        input: '',
        showWarning: false
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state.input));
    }

    onHide = () => {
        this.setState(() => ({
            showWarning: true
        }));
    }

    render() {
        const { input, showWarning } = this.state;
        const userIds = Object.keys(this.props.users);
        return (
            <Modal show={this.props.showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={this.onHide}
                >
                <Modal.Header>
                    <Modal.Title>
                        <span>Welcome to <b>Would you rather ... ?</b> Who are you?</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{alignSelf: 'center', width: '100%'}}>
                    { !showWarning ? null :
                        <Alert variant={'danger'}>
                            Sorry! No escape! You gotta <b>login</b> first ;)
                        </Alert>
                    }
                    <div style={{display: 'flex'}}>
                        <Typeahead style={{marginRight: '2em', width: '75%'}} id='typeahead'
                            onChange={(selected) => {
                                this.setState(() => ({
                                    input: selected[0]
                                }));
                            }}
                            options={[...userIds]}
                        />
                        <Button variant="secondary" disabled={input === ''} onClick={this.handleLogin}>Login</Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

// eslint-disable-next-line no-empty-pattern
function mapStateToProps({users}, {showModal}) {
    return {
        users: users,
        showModal: showModal
    }
}

export default connect(mapStateToProps)(Login);
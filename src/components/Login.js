import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
    render() {
        return (
            <div>
                <h3>LOGIN AS</h3>
                <input placeholder="your name"/>
            </div>
        )
    }
}

export default connect()(Login);
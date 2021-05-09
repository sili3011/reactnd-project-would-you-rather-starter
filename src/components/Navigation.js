import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { BsHouseDoor, BsPlusCircle, BsPeopleCircle, BsReverseLayoutTextSidebarReverse } from 'react-icons/bs'
import { logoutUser } from '../actions/loggedInUser'
import { Link } from 'react-router-dom'

class Navigation extends Component{
    onLogout = () => {
        this.props.dispatch(logoutUser());
    }

    render() {
        const { loggedInUser } = this.props;
        return(
            <Navbar expand='lg' bg='dark' variant='dark' style={{padding: '0.5em 1em'}}>
                <Navbar.Brand>Would you rather ... ?</Navbar.Brand>
                <Navbar style={{width: '100%', padding: 0}}>
                    <Nav className='mr-auto'>
                        <Link to="/" className='nav nav-link align-icon-text'>
                            <BsHouseDoor className='icon'/>
                            Home
                        </Link>
                        <Link to="/leaderboard" className='nav nav-link align-icon-text'>
                            <BsReverseLayoutTextSidebarReverse className='icon'/>
                            Leaderboard
                        </Link>
                        <Link to="#new" className='nav nav-link align-icon-text'>
                            <BsPlusCircle className='icon'/>
                            New question
                        </Link>
                    </Nav>
                    <Nav style={{position: 'absolute', right: '0'}}>
                        <Nav.Link className='align-icon-text' onClick={this.onLogout}>
                            <BsPeopleCircle className='icon'/>{loggedInUser ? `Logout ${loggedInUser}` : 'Login'}
                        </Nav.Link>  
                    </Nav>
                </Navbar>
            </Navbar>
        )
    }
}

function mapStateToProps({loggedInUser}) {
  return {
    loggedInUser: loggedInUser
  }
}

export default connect(mapStateToProps)(Navigation)
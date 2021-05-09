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
                        <Link to="/add" className='nav nav-link align-icon-text'>
                            <BsPlusCircle className='icon'/>
                            New question
                        </Link>
                    </Nav>
                    <Nav style={{position: 'absolute', right: '0'}}>
                        <Nav.Link className='align-icon-text' onClick={this.onLogout}>
                            {loggedInUser && loggedInUser.avatarURL ?
                                <img src={loggedInUser.avatarURL} width='40px' style={{borderRadius: '20px', marginRight: '5px'}}/> :
                                <BsPeopleCircle className='icon'/>
                            }
                            {loggedInUser ? `Logout ${loggedInUser.name}` : 'Login'}
                        </Nav.Link>  
                    </Nav>
                </Navbar>
            </Navbar>
        )
    }
}

function mapStateToProps({loggedInUser, users}) {
  return {
    loggedInUser: users[loggedInUser]
  }
}

export default connect(mapStateToProps)(Navigation)
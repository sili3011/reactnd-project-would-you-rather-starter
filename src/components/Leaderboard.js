import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    return (
    <div style={{margin: '2em 10em'}}>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>User name</th>
                <th>Answered questions</th>
                <th>Asked questions</th>
                <th>Sum</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td>{users.indexOf(u) + 1}</td>
                        <td>{u.name}</td>
                        <td>{Object.values(u.answers).length}</td>
                        <td>{u.questions.length}</td>
                        <td>{Object.values(u.answers).length + u.questions.length}</td>
                    </tr>
                ))}
            </tbody>
            </Table>
    </div>
    );
  }
}

function mapStateToProps({users}) {
  return {
      users: Object.values(users).sort((a, b) => (Object.values(users[b.id].answers).length + users[b.id].questions.length) - (Object.values(users[a.id].answers).length + users[a.id].questions.length))
  }
}

export default connect(mapStateToProps)(Leaderboard);

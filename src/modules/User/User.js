import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardBody,
  CardTitle,
  Spinner
} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

class User extends React.Component {
  state = {
    users: null,
    loading: false
  }

  componentDidMount(){
    let token = localStorage.getItem("token");

    if(token){
      this.setState({loading: true})
      axios({
        method: "GET",
        url: "http://localhost:3030/api/v1/user/",
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({loading: false})
        if(res.data.success){
          this.setState({
            users: res.data.result
          })
        }
      })
      .catch(err => {
        this.setState({loading: false})
        console.log(err)
      })
    }
  }

  handleAddUser = (e) => {
    e.preventDefault()
    this.props.history.push("/addUser")
  }

  handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token");
    this.props.history.replace("/login")
  }

  render(){
    return(
      <Container>
        <h1>Daftar User</h1>
        <Button 
          color="primary" 
          className="mb-3 mr-2"
          onClick={this.handleAddUser}
          >Add User</Button>
        <Button 
          color="secondary" 
          className="mb-3"
          onClick={this.handleLogout}
          >Logout</Button>
        {this.state.loading ?
          <div className="text-center">
            <Spinner />
          </div>
        : 
        this.state.users &&
        this.state.users.map((user, idx) => {
          return(
            <Card key={idx} className="p-4 mb-2">
              <CardTitle className="display-4 text-center">{user.fullname}</CardTitle>
              <CardBody className="text-center">{user.email}</CardBody>
            </Card>
          )
        })

        }
      </Container>
    )
  }
}

export default User;
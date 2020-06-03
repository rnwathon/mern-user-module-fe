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
  CardImg,
  CardBody,
  CardTitle,
  CardFooter,
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
    this.handleGetuser();
  }

  handleGetuser = () => {
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

  handleDelete = (e, id) => {
    e.preventDefault()
    let token = localStorage.getItem('token');
    let hapus = window.confirm("Apakah anda yakin?");

    if(hapus){
      axios({
        method: "DELETE",
        url: "http://localhost:3030/api/v1/user/",
        headers: {
          Authorization: token
        },
        data: {
          id: id
        }
      })
      .then(res => {
        if(res.data.success){
          this.handleGetuser()
        }
      })
      .catch(err => {
        window.alert(err)
      })
    }
  }

  handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token");
    this.props.history.replace("/login")
  }

  render(){
    console.log(this.state.users)
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
              {user.imagePath && 
              <CardImg top width="50%" src={user.imagePath} alt="Card image cap" />}
              <CardTitle className="display-4 text-center">{user.fullname}</CardTitle>
              <CardBody className="text-center">{user.email}</CardBody>
              <CardFooter className="text-center">
                <Button 
                  color="info mx-2"
                  onClick={() => {
                    this.props.history.push({
                      pathname: '/editUser',
                      state: {
                        id: user._id
                      }
                    })
                  }}
                  >
                    Edit
                </Button>
                <Button 
                  color="danger mx-2"
                  onClick={(e) => {this.handleDelete(e, user._id)}}
                  >Delete
                </Button>
              </CardFooter>
            </Card>
          )
        })

        }
      </Container>
    )
  }
}

export default User;
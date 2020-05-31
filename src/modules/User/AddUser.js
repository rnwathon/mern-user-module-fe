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

class AddUser extends React.Component {
  state = {
    fullname: "",
    email: "",
    password: "",
    loading: false
  }

  handleOnChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token')

    this.setState({ loading: true })
    axios({
      method: "POST",
      url: "http://localhost:3030/api/v1/user/",
      headers: {
        Authorization: token
      },
      data: {
        fullname: this.state.fullname,
        email: this.state.email,
        password: this.state.password
      }
    })
    .then(res => {
      this.setState({ loading: false })

      if(res.data.success){
        Swal.fire({
          icon: 'success',
          text: 'user berhasil ditambahkan!'
        })
        .then(() => {
          this.props.history.replace("/")
        })
      }
    })
    .catch(err => {
      this.setState({ loading: false })

      Swal.fire({
        icon: 'error',
        text: err.response.data.message
      })
    })
  }

  render(){
    return(
      <Container>
        <Row style={{height: "100vh"}} className="align-items-center">
          <Col>
            <Card>
              <CardTitle className="display-4 text-center mt-3">Add User</CardTitle>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="fullname">Full Name</Label>
                    <Input type="text" id="fullname" placeholder="enter user fullname" value={this.state.fullname} onChange={this.handleOnChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" id="email" placeholder="enter user email" value={this.state.email} onChange={this.handleOnChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" placeholder="enter user password" value={this.state.password} onChange={this.handleOnChange}/>
                  </FormGroup>
                  <Button color="primary" onClick={this.handleSubmit} disabled={this.state.loading}>
                    {this.state.loading ? <Spinner /> : "Submit"}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AddUser;
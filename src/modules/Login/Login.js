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
  CardTitle
} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import verifyToken from '../../helpers/verifyToken';

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  }

  componentDidMount() {
    let token = verifyToken()
    if(token) this.props.history.replace('/')
  }

  handleOnchange = (e, a, b) => {
    e.preventDefault();

    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleLoginClick = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: "http://localhost:3030/api/v1/user/login",
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .then(res => {
      if(res.data.success){
        // Simpen Token di local storage
        localStorage.setItem('token', res.data.token)
        // Redirect user ke home
        this.props.history.push("/")
      }else{
        // Handle Error yang masuk ke then
      }
    })
    .catch(err => {
      Swal.fire({
        icon: "error",
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
              <CardTitle className="display-4 text-center mt-3">Login</CardTitle>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      value={this.state.email} 
                      onChange={this.handleOnchange}
                      placeholder="Enter Your Email" 
                      />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input 
                      type="password" 
                      id="password"
                      value={this.state.password}
                      onChange={this.handleOnchange}
                      placeholder="Enter Your Password" 
                      />
                  </FormGroup>
                  <Button color="primary" block onClick={this.handleLoginClick}>
                    Login
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

export default Login;
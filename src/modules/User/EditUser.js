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

class EditUser extends React.Component {
  state = {
    id: "",
    fullname: "",
    email: "",
    password: "",
    loading: false
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    let id = this.props.location && this.props.location.state && this.props.location.state.id;

    if(!id){
      this.props.history.goBack();
      return;
    }else{
      this.setState({id: id})
    }

    axios({
      method: "POST",
      url: "http://localhost:3030/api/v1/user/detail",
      headers: {
        Authorization: token
      },
      data: {
        id: id
      }
    })
    .then(res => {
      if(res.data.success){
        this.setState({
          fullname: res.data.result.fullname
        })
      }
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        text: err.response.data.message
      })
    })
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
    // Request Edit User
    axios({
      method: "PUT",
      url: "http://localhost:3030/api/v1/user/",
      headers: {
        Authorization: token
      },
      data: {
        id: this.state.id,
        fullname: this.state.fullname
      }
    })
    .then(res => {
      this.setState({ loading: false })

      if(res.data.success){
        Swal.fire({
          icon: 'success',
          text: 'user berhasil diedit!'
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
              <CardTitle className="display-4 text-center mt-3">Edit User</CardTitle>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="fullname">Full Name</Label>
                    <Input type="text" id="fullname" placeholder="enter user fullname" value={this.state.fullname} onChange={this.handleOnChange}/>
                  </FormGroup>
                  {/* <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" placeholder="enter user password" value={this.state.password} onChange={this.handleOnChange}/>
                  </FormGroup> */}
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

export default EditUser;
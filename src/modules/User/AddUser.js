import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  CustomInput,
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
    image: {
      value: "",
      file: null
    },
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

  handleFileOnChange = (e) => {
    e.preventDefault();

    this.setState({
      image: {
        value: e.target.value,
        file: e.target.files[0]
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token')

    // Declare form Data
    let formData = new FormData()
    // Masukin key:value ke form data
    formData.append("fullname", this.state.fullname)
    formData.append("email", this.state.email)
    formData.append("password", this.state.password)
    formData.append("image", this.state.image.file)

    if(!token){
      this.props.history.replace('/login')
    }else{
      this.setState({ loading: true })
      axios({
        method: "POST",
        url: "http://localhost:3030/api/v1/user/",
        headers: {
          Authorization: token
        },
        data: formData
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
  }

  render(){
    console.log(this.state)
    return(
      <Container>
        <Row style={{height: "100vh"}} className="align-items-center">
          <Col>
            <Card>
              <CardTitle className="display-4 text-center mt-3">Add User</CardTitle>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="exampleCustomFileBrowser">File Browser</Label>
                    <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" onChange={this.handleFileOnChange}/>
                  </FormGroup>
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
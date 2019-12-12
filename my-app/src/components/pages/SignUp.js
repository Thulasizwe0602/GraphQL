import React from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import logo from "../../assets/mdb-react.png";

class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      emailElement: '',
      passwordElement: '',
      firstNameElement: '',
      lastNameElement: '',
      phoneNumberElement: ''
    };

  }

  emailChangedHandler = (event) => {
    this.setState({
      emailElement: event.target.value
    });
  };

  firstNameChangedHandler = (event) => {
    this.setState({
      firstNameElement: event.target.value
    });
  };

  lastNameChangedHandler = (event) => {
    this.setState({
      lastNameElement: event.target.value
    });
  };

  phoneNumberChangedHandler = (event) => {
    this.setState({
      phoneNumberElement: event.target.value
    });
  };

  passwordChangedHandler = (event) => {
    this.setState({
      passwordElement: event.target.value
    });
  };

  signUpHandler = (event) => {

    event.preventDefault();
    const email = this.state.emailElement;
    const password = this.state.passwordElement;
    const firstname = this.state.firstNameElement;
    const lastname = this.state.lastNameElement;
    const phoneNumber = this.state.phoneNumberElement;

    console.log(email, password);

    const registerRequestBody = {
      query: `
        mutation {
          createUser(userInput : {email: "${email}", password: "${password}", firstName: "${firstname}", lastName: "${lastname}", phoneNumber: "${phoneNumber}", isProfileUpdated: false, isActive: false} ) 
          {
            _id
            email 
          }
        }
      `
    };

    fetch('http://localhost:5000/api', {
      method: 'POST',
      body: JSON.stringify(registerRequestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed to connect to the server')
      }
      return response.json();
    })
      .then(resData => {
        this.context.login("xxx", resData.data.login.userId, resData.data.login.expiration);
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const smallStyle = { fontSize: '0.8rem' }
    return (
      <MDBRow>
        <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5"><strong>Sign Up</strong></h3>
                <img alt="Infinity Life Logo" className="img-fluid" src={logo} />
              </div>
              <MDBInput label="Your email" group type="email" validate error="wrong" success="right" value={this.state.emailElement} onChange={this.emailChangedHandler} />
              <MDBInput label="Your password" group type="password" validate containerClass="mb-0" value={this.state.passwordElement} onChange={this.passwordChangedHandler} />
              <MDBInput label="Your first name" group type="text" validate error="wrong" success="right" value={this.state.firstNameElement} onChange={this.firstNameChangedHandler} />
              <MDBInput label="Your last name" group type="text" validate error="wrong" success="right" value={this.state.lastNameElement} onChange={this.lastNameChangedHandler} />
              <MDBInput label="Your phone number" group type="text" validate error="wrong" success="right" value={this.state.phoneNumberElement} onChange={this.phoneNumberChangedHandler} />
              <div className="text-center pt-3 mb-3">
                <MDBBtn type="button" gradient="blue" rounded className="btn-block z-depth-1a" onClick={this.signUpHandler}>Sign in</MDBBtn>
              </div>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="grey-text d-flex justify-content-end" style={smallStyle}>Already a member?<NavLink exact={true} to="/signin" className="blue-text ml-1"> Sign In </NavLink></p>
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default SignUp;
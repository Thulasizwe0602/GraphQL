import React from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';
import { NavLink, Redirect  } from 'react-router-dom';
import logo from "../../assets/mdb-react.png";

import AuthContext from '../../context/context';
class SignIn extends React.Component {

  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      emailElement: '',
      passwordElement: ''
    };

  }

  emailChangedHandler = (event) => {
    this.setState({
      emailElement: event.target.value
    });
  };

  passwordChangedHandler = (event) => {
    this.setState({
      passwordElement: event.target.value
    });
  };

  signInHandler = (event) => {

    event.preventDefault();
    const email = this.state.emailElement;
    const password = this.state.passwordElement;

    console.log(email, password);

    const loginRequestBody = {
      query: `
        query {
          login( email: "${email}", password: "${password}") 
          {
            userId
            token
            expiration       
          }
        }
      `
    };

    fetch('http://localhost:5000/api', {
      method: 'POST',
      body: JSON.stringify(loginRequestBody),
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
        if (resData.data.login.token) {
          this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.expiration);

          console.log(resData);
          return(<Redirect from="/signin" to="/tables" />);
        }
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
                <img alt="Infinity Life Logo" className="img-fluid" src={logo} />
                <h3 className="dark-grey-text mb-5"><strong>Sign in</strong></h3>
              </div>
              <MDBInput label="Your email" group type="email" validate error="wrong" success="right" value={this.state.emailElement} onChange={this.emailChangedHandler} />
              <MDBInput label="Your password" group type="password" validate containerClass="mb-0" value={this.state.passwordElement} onChange={this.passwordChangedHandler} />

              <div className="text-center pt-3 mb-3">
                <MDBBtn type="button" gradient="blue" rounded className="btn-block z-depth-1a" onClick={this.signInHandler} >Sign in</MDBBtn>
              </div>
              <p className="dark-grey-text text-right d-flex justify-content-center mb-3 pt-2" style={smallStyle}> or Sign up with:</p>
              <div className="row my-3 d-flex justify-content-center">
                <MDBBtn type="button" color="white" rounded className="mr-md-3 z-depth-1a"><MDBIcon fab icon="facebook-f" className="blue-text text-center" /></MDBBtn>
                <MDBBtn type="button" color="white" rounded className="mr-md-3 z-depth-1a"><MDBIcon fab icon="twitter" className="blue-text" /></MDBBtn>
                <MDBBtn type="button" color="white" rounded className="z-depth-1a"><MDBIcon fab icon="google-plus-g" className="blue-text" /></MDBBtn>
              </div>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
            <p className="grey-text d-flex justify-content-end" style={smallStyle}>Don't have an account?<NavLink exact={true} to="/signup" className="blue-text ml-1"> Sign Up </NavLink></p>
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default SignIn;
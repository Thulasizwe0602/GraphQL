import React from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon } from 'mdbreact';

class SignUp extends React.Component {

  render() {
    const smallStyle = { fontSize: '0.8rem' }
    return (
      <MDBRow>
        <MDBCol md="9" lg="7" xl="5" className="mx-auto mt-3">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5"><strong>Sign Up</strong></h3>
              </div>
              <MDBInput label="Your email" group type="email" validate error="wrong" success="right" />
              <MDBInput label="Your password" group type="password" validate containerClass="mb-0" />
              <MDBInput label="Your first name" group type="text" validate error="wrong" success="right" />
              <MDBInput label="Your last name" group type="text" validate error="wrong" success="right" />
              <MDBInput label="Your phone number" group type="text" validate error="wrong" success="right" />
              <div className="text-center pt-3 mb-3">
                <MDBBtn type="button" gradient="blue" rounded className="btn-block z-depth-1a">Sign in</MDBBtn>
              </div>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="grey-text d-flex justify-content-end" style={smallStyle}>Already a member? <a href="/signin" className="blue-text ml-1"> Sign In</a></p>
            </MDBModalFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default SignUp;
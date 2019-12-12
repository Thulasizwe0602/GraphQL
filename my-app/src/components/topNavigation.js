import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

class TopNavigation extends Component {
    state = {
        collapse: false
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                <MDBNavbarBrand href="/">
                    <strong>MDB</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <MDBNavLink to="#">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a rel="noopener noreferrer" className="nav-link Ripple-parent" href="" target="_blank">About MDB</a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a rel="noopener noreferrer" className="nav-link Ripple-parent" href="" target="_blank">Free download</a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a rel="noopener noreferrer"  className="nav-link Ripple-parent" href="" target="_blank">Free tutorials</a>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <a className="nav-link navbar-link" rel="noopener noreferrer" target="_blank" href=""><MDBIcon fab icon="facebook" /></a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a className="nav-link navbar-link" rel="noopener noreferrer" target="_blank" href=""><MDBIcon fab icon="twitter" /></a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a className="border border-light rounded mr-1 nav-link Ripple-parent" rel="noopener noreferrer" href="" target="_blank"><MDBIcon fab icon="github" className="mr-2"/>MDB GitHub</a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a className="border border-light rounded mr-1 nav-link Ripple-parent" rel="noopener noreferrer" href="" target="_blank"><MDBIcon fab icon="github" className="mr-2"/>Go Pro</a>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default TopNavigation;
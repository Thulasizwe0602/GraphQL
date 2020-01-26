import React, { Component } from 'react';
import logo from "../assets/mdb-react.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

import AuthContext from '../context/context';
class SideNavigation extends Component {



    render () {
        return (
            <div className="sidebar-fixed position-fixed">
                <a href="#!" className="logo-wrapper waves-effect">
                    <img alt="Infinity Life Logo" className="img-fluid" src={logo} />
                </a>
                <MDBListGroup className="list-group-flush" >
                    <NavLink exact={true} to="/" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="chart-pie" className="mr-3" />
                                Dashboard
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/profile" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="user" className="mr-3" />
                                Profile
                        </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/tables" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="table" className="mr-3" />
                            Tables
                    </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/maps" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="map" className="mr-3" />
                            Maps
                    </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/accounts" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="user" className="mr-3" />
                            Accounts
                    </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/quotations" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="user" className="mr-3" />
                            Quotations
                    </MDBListGroupItem>
                    </NavLink>

                </MDBListGroup>
            </div>
        );
    };

}

export default SideNavigation;
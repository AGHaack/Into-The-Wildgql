import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from './into-the-wild-logo.png';
import Background from './HeaderColor.css';
import { graphql } from 'react-apollo';
import { loginMutation } from '../queries/queries';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    signOut = () =>{
        localStorage.removeItem("token");
        window.location.reload();
    }
    loginHandler = (event) => {
        event.preventDefault();
        this.props.loginMutation({
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        })
        .then(response => {
            localStorage.setItem("token", response.data.login.token);
            window.location.reload();
        })
    }
    render() {
        let links =(
            <li className="nav-item active">
                <Link className="nav-link" to="/sign-up">Sign up</Link>
            </li>
        );
        let signInSignOutForm = (
            <div className='nav justify-content-right'>
            <form onSubmit={this.loginHandler.bind(this)} className="form-inline">
                <input onChange={(e) => this.setState({email: e.target.value})}  name="email" className="form-control mr-sm-2" type="email" placeholder="Email" aria-label="Email" />
                <input onChange={(e) => this.setState({password: e.target.value})} name="password" className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" />                        
                <button className="btn btn-outline-light" type="submit">Sign In</button>
            </form>
            </div>
        );
        if(localStorage.getItem("token")){
            links =(
                <div className="nav justify-content-left" >
                    <div>
                        <Link className="nav-link nav-item active" to="/home/my-adventure" >Explore Parks</Link>
                    </div>
                    <div>
                        <Link className="nav-link nav-item active" to="/home/my-profile">My Profile</Link>
                    </div>
                </div>
            )
            signInSignOutForm = <button onClick={this.signOut} className="btn btn-outline-light my-2 my-sm-0" type="submit">Sign Out</button>
        }
        console.log(localStorage.getItem("loggedInUser"));
        return (
            <div className="mb-1">
                <nav className="navbar navbar-expand-xl navbar-light fixed-top header" style={Background} >
                    <Link className="navbar-brand" to="/">
                        <img src={Logo} width="125" height="125" alt="Into The Wild" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav mr-auto justify-content-left" style={{width: '50%', height: '50px'}} id="navbarNavAltMarkup">
                            {links}
                                <Link className="nav-link nav-item active" to="/about-us">About us</Link>
                        </div>
                        {signInSignOutForm}
                    </div>
                </nav>
            </div>
        );
    }
}

export default graphql(loginMutation, { name: 'loginMutation' })(Header);
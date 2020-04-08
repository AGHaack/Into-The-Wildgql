import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { signupMutation } from '../queries/queries';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            passwordConf: ''
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempUser = {...this.state.newUser};
        tempUser[name] = value;
        this.setState({
            newUser: tempUser
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.signupMutation({
            variables: {
                firstName: this.state.newUser.firstName,
                lastName: this.state.newUser.lastName,
                email: this.state.newUser.email,
                password: this.state.newUser.password
            }
        })
        .then(response => {
            console.log(response);
            // this.props.history.push('/thank-you');
        })
    }
    render() {
        let submitButton = (
            <div>
                <button type="submit" className="btn btn-success btn-lg btn-block mt-3">Sign Up</button>
            </div>
       );
       if(this.state.newUser.password !== this.state.passwordConf) {
           submitButton = (
               <div>
                   <button type="button" className="btn btn-danger btn-lg btn-block mt-3" disabled>Sign Up</button>
               </div>
           );
       }
        return (
            <div style={{marginTop: "250px"}}>
                <form className="sign-up-form container" onSubmit={this.submitHandler.bind(this)} >
                <h2>Sign up:</h2>
                    <div className="row">
                        <div className="col">
                            <input name="firstName" value={this.state.newUser.firstName} onChange={this.handleChange} type="text" className="form-control" placeholder="First name" />
                        </div>
                        <div className="col">
                            <input name="lastName" value={this.state.newUser.lastName} onChange={this.handleChange} className="form-control" placeholder="Last name" type="text" />
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col">
                            <input type="email" name="email" value={this.state.newUser.email} onChange={this.handleChange} className="form-control" placeholder="Email" />
                        </div>
                        <div className="col">
                            <input type="password" name="password" value={this.state.newUser.password} onChange={this.handleChange} className="form-control" placeholder="Password" />
                        </div>
                        <div className="col">
                            <input type="password" name="password2" onChange={(e) => this.setState({passwordConf: e.target.value})} className="form-control" placeholder="Confirm Password" />
                        </div>
                    </div>
                    {submitButton}
                </form>
            </div>
        );
    }
}

export default graphql(signupMutation, { name: 'signupMutation'})(SignUp);
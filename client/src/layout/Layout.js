import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import SignUp from '../sign-up/SignUp';
import Thankyou from './../sign-up/Thankyou';
import Header from './../header/Header';
import About from './../about-us/About';

class Layout extends Component {
    render() {
        let routes = (
            <React.Fragment>
                <div>
                    <Route exact path="/" component={SignUp} />
                    <Route path="/sign-up" component={SignUp} /> 
                    <Route path="/thank-you" component={Thankyou} />
                </div>
            </React.Fragment>
        );
        if(localStorage.getItem("token")) {
            routes = (
                <div style={{ marginTop: "250px"}}>
                    <h1>Test</h1>
                </div>
            );
        }
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    {routes}
                    <Route path="/about-us" component={About} />
                </div>
            </div>
        );
    }
}

export default withRouter(Layout);
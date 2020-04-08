import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className="w3-content mt-5 pt-5" style={{'max-width': '1200px'}}>
                <div className="w3-panel">
                 <i className="w3-xlarge fa fa-bars"></i>
                </div>
                {/* First Grid: Logo & About */}
                <div className="w3-row">
                    <div className="w3-half w3-container">
                        <h1 className="w3-xxlarge w3-text-light-grey">Hello</h1>
                        <h1 className="w3-xxlarge w3-text-light-grey">We are</h1>
                        <h1 className="w3-jumbo">InShock</h1>
                    </div>
                    <div className="w3-half w3-container w3-xlarge w3-text-grey">
                        <p className="">We build design teams.  
                        We break things down and build it better.
                        We deliver the best solutions.</p>
                        <p>InShock means powerful simplicity</p>
                    </div>
                </div>
                {/*Second Grid: Resent */}
                <div className="w3-panel w3-text-grey">
                    <h4>Most Recent Work:</h4>
                </div>
                <div className="w3-row">
                    <div className="w3-half w3-container">
                        
                        <p className="w3-xlarge w3-text-grey">
                            Demos, Logos, Reports, Names, Events, Media,
                            Wordpress, Google, Books, Optimisations</p>
                    </div>
                </div>
                <div className="w3-row">
                    <div className="w3-half w3-container">
                        
                        <p className="w3-xlarge w3-text-grey">
                            Demos, Logos, Reports, Names, Events, Media,
                            Wordpress, Google, Books, Optimisations</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
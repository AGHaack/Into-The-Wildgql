import React, { Component } from 'react';
import './Modal.css';
import { newAdventureMutation } from '../../../queries/queries';
import { graphql } from 'react-apollo';
import Axios from 'axios';
import Dropzone from 'react-dropzone'


class NewPostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adventure: {
                title: '',
                park: '',
                activity: '',
                parkLocation: '',
                adventureDate: '',
                post: '',
                rating: ''
            },
            file: null
        }
    }
    onDrop = async files => {
        this.setState({
            file: files[0]
        });
    }
    submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("upload_preset", "gf6wfvwp");
        formData.append("file", this.state.file);
        Axios.post("https://api.cloudinary.com/v1_1/dohwimoiy/image/upload", formData)
        .then(res => {
            const img = res.data.secure_url;
            this.props.newAdventureMutation({
                variables: {
                    title: this.state.adventure.title,
                    park: this.state.adventure.park,
                    activity: this.state.adventure.activity,
                    parkLocation: this.state.adventure.parkLocation,
                    adventureDate: this.state.adventure.adventureDate,
                    post: this.state.adventure.post,
                    rating: parseInt(this.state.adventure.rating),
                    imgPublicId: img
                }
            })
            .then(response => {
                window.location.reload();
            })
        })
        
    }
    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempAdventure = {...this.state.adventure};
        tempAdventure[name] = value;
        this.setState({
            adventure: tempAdventure
        })
    }
    render() {
        console.log(this.state.file);
        const showHideClassName = this.props.showing ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New Adventure Post</h5>
                        <button type="button" className="close" onClick={this.props.handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                        
                        <form onSubmit={this.submitHandler}>
                            <label htmlFor="title">Give your Adventure a Title</label>
                            <input value={this.state.adventure.title} onChange={this.handleChange} name="title" className="form-control form-control-lg" type="text" id="title" placeholder="Title" />
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="park">National Park:</label>
                                    <input name="park" onChange={this.handleChange} value={this.state.adventure.park} id="park" type="text" className="form-control" placeholder="Park Name" />
                                </div>
                                <div className="col">
                                    <label htmlFor="activity">What did you do?</label>
                                    <input name="activity" onChange={this.handleChange} value={this.state.adventure.activity} type="text" className="form-control" placeholder="Activity" />
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="parkLocation">Where in the park?</label>
                                    <input name="parkLocation" onChange={this.handleChange} value={this.state.adventure.parkLocation} id="parkLocation" type="text" className="form-control" placeholder="where" />
                                </div>
                                <div className="col">
                                    <label htmlFor="when">When did this adventure happen?</label>
                                    <input name="adventureDate" onChange={this.handleChange} value={this.state.adventure.adventureDate} id="when" type="text" className="form-control" placeholder="Date" />
                                </div>
                                <div className="col">
                                    <label htmlFor="rating">How Would you Rate this adventure</label>
                                    <input name="rating" onChange={this.handleChange} value={this.state.adventure.rating} id="rating" type="text" className="form-control" placeholder="activity" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="summary">Tell us a little about the experience</label>
                                <textarea name="post" onChange={this.handleChange} value={this.state.adventure.post} className="form-control" id="summary" rows="4"></textarea>
                            </div>
                            <div>
                                <Dropzone onDrop={this.onDrop}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} type="file" />
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                        </div>
                                    </section>
                                )}
                                </Dropzone>
                            </div>
            

                            <button type="submit" className="btn btn-success btn-lg">Submit</button>
                        </form>


                    </div>              
                </div>
            </div>
        </div>
        );
    }
}

export default graphql(newAdventureMutation, { name: 'newAdventureMutation' })(NewPostModal);
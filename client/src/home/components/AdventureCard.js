import React from 'react';
import { Link } from 'react-router-dom';

const AdventureCard = ({ adventure }) => {
    return (
        <div className="card text-center">
            <div className="card-header">
                {adventure.title}
            </div>
            <div className="card-body">
                <h5 className="card-title">{adventure.park}</h5>
                <p className="card-text">{adventure.activity} {adventure.rating}</p>
                <Link to="#" className="btn btn-primary">Details</Link>
            </div>
            <div className="card-footer text-muted">
                2 days ago
            </div>
        </div>
    );
}

export default AdventureCard;
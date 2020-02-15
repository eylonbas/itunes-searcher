import React from 'react';
import { Link } from 'react-router-dom';

export default function ResultItem(props) {
    return (
        <Link to={'/result/' + props.id}>
            <div className='result-item'>
                <img className='result-item-image' src={props.media.imageUrl} />
                <div className='result-details-block'>
                    <label className='result-title'>
                        {props.title}
                    </label>
                    <label className='result-description'>
                        {props.artistName + ' (' + props.media.type + ')'}
                    </label>
                </div>
            </div>
        </Link>
    );
}
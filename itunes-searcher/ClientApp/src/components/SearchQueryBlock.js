import React from 'react';

export default function SearchQueryBlock(props) {
    function handleQueryClick() {
        props.handleClick(props.query);
    }

    return (
        <div
            className='search-query-block'
            onClick={handleQueryClick}
        >
            <label className='query-string'>
                {props.query}
            </label>
            <label
                className={
                    props.searchCount === 1 ?
                        'query-search-count-single' :
                        'query-search-count '
                }>
                {props.searchCount}
            </label>
        </div >
    );
}
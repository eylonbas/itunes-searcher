import React from 'react';
import SearchQueryBlock from './SearchQueryBlock';

export default function SearchQueryList(props) {
    return (
        <div className='search-query-list'>
            {
                props.searchQueries.map((item) => {
                    return <SearchQueryBlock
                        key={item.query}
                        handleClick={props.handleClick}
                        {...item}
                    />
                })
            }
        </div>
    );
}
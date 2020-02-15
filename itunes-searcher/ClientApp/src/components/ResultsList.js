import React from 'react';
import ResultItem from './ResultItem';

export default function ResultsList(props) {
    return (
        <div className='results-list'>
            {
                props.results.map((result) => {
                    return <ResultItem
                        key={result.id}
                        {...result}
                    />
                })
            }
        </div>
    );
}
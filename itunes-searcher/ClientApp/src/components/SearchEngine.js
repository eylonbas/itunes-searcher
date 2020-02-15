import React from 'react';
import ResultsList from './ResultsList';
import FilterBlock from './FilterBlock';
import SearchQueryList from './SearchQueryList';
import Spinner from './Spinner';

export default class SearchEngine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastFilterTerm: '',
            results: [],
            topQueries: [],
            status: 'loading',
        };

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleTopTenClick = this.handleTopTenClick.bind(this);
        this.renderSearchEngineBody = this.renderSearchEngineBody.bind(this);
    }

    componentDidMount() {
        this.handleTopTenClick();
    }

    handleFilterChange(term) {
        const API_URL_BASE = 'https://itunes.apple.com/search';
        const RESULTS_LIMIT = 25;
        const API_REQUEST_PARAMETERS =
            '?media=music&entity=musicTrack&limit=' + RESULTS_LIMIT + '&term=';
        const encodedTerm = encodeURI(term);

        this.setState(
            Object.assign({},
                this.state,
                {
                    status: 'loading',
                    lastFilterTerm: term,
                }
            ));

        this.logSearchInDatabase(term);
        fetch(API_URL_BASE + API_REQUEST_PARAMETERS + encodedTerm)
            .then(response => response.json())
            .then(data => {
                this.setState(
                    Object.assign({},
                        this.state,
                        {
                            results: this.handleItunesApiResponse(data.results),
                            status: 'search',
                        }
                    ));
            });
    }

    logSearchInDatabase(searchQuery) {
        console.log(JSON.stringify({ query: searchQuery }));
        const SEARCHER_API_REQUEST = '/api/searcher/SearchQuery';

        fetch(SEARCHER_API_REQUEST, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Query: searchQuery }),
        }); // missing error handling implementation
    }

    handleItunesApiResponse(jsonResponse) {
        return jsonResponse.map(item => {
            return {
                id: item.trackId,
                title: item.trackName,
                artistName: item.artistName,
                media: {
                    type: item.kind,
                    imageUrl: item.artworkUrl100,
                },
            };
        });
    }

    handleTopTenClick() {
        const SEARCHER_API_REQUEST = '/api/searcher/GetTopTenSearchQueries';

        this.setState(
            Object.assign({},
                this.state,
                {
                    status: 'loading',
                }
            ));
        fetch(SEARCHER_API_REQUEST)
            .then(response => response.json())
            .then(data => {
                this.setState(
                    Object.assign({},
                        this.state,
                        {
                            topQueries: this.handleSearcherApiResponse(data),
                            status: 'topQueries',
                        }
                    ));
            });
    }

    handleSearcherApiResponse(jsonResponse) {
        return jsonResponse.map(item => {
            return {
                query: item.Query,
                searchCount: item.SearchCount,
            };
        });
    }

    renderSearchEngineBody() {
        switch (this.state.status) {
            case 'loading': return <Spinner />;
            case 'search': return <ResultsList results={this.state.results} />;
            case 'topQueries': return (
                <SearchQueryList
                    searchQueries={this.state.topQueries}
                    handleClick={this.handleFilterChange}
                />
            );
            default: return null;
        }
    }

    render() {
        return (
            <div className='search-engine'>
                <div className='search-engine-header'>
                    <FilterBlock
                        handleSubmit={this.handleFilterChange}
                        lastFilterTerm={this.state.lastFilterTerm}
                    />
                    <button
                        className='top-10-button'
                        type='button'
                        onClick={this.handleTopTenClick}
                    >
                        Top 10 Searching
                    </button>
                </div>
                {this.renderSearchEngineBody()}
            </div>
        );
    }
}
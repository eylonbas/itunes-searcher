import React from 'react';
import Spinner from './Spinner';
import MediaVideoPlayer from './MediaVideoPlayer';

export default class ResultPageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idParameter: props.match.params.id,
            status: 'loading',
        }

        this.getResultDetails = this.getResultDetails.bind(this);
    }

    componentDidMount() {
        this.getResultDetails(this.state.idParameter);
    }

    getResultDetails(resultId) {
        const API_URL_BASE = 'https://itunes.apple.com/lookup?id=';
        this.setState(
            Object.assign({},
                this.state,
                {
                    status: 'loading',
                }
            ));

        fetch(API_URL_BASE + resultId)
            .then(response => response.json())
            .then(data => {
                this.setState(
                    Object.assign({},
                        this.state,
                        {
                            result: this.handleItunesApiResponse(data.results[0]),
                            status: 'displayed',
                        }
                    ));
            });
    }

    handleItunesApiResponse(jsonResponse) {
        return {
            id: jsonResponse.trackId,
            title: jsonResponse.trackName,
            artistName: jsonResponse.artistName,
            media: {
                type: jsonResponse.kind,
                imageUrl: jsonResponse.artworkUrl100,
                previewUrl: jsonResponse.previewUrl,
                viewUrl: jsonResponse.trackViewUrl,
            }
        };
    }

    renderResultBlock() {
        const result = this.state.result;

        return (
            <div className='result-block'>
                <div className='result-block-header'>
                    <img className='result-block-image' src={result.media.imageUrl} />
                    <div className='result-block-details'>
                        <label className='result-block-title'>{result.title}</label>
                        <label className='result-block-artist-name'>{result.artistName}</label>
                    </div>
                    <a
                        className='view-full-media-button'
                        href={result.media.viewUrl}
                        target='_blank'
                    >
                        Go to iTunes page
                </a>
                </div>
                <MediaVideoPlayer {...result.media} />
            </div>
        )
    }

    render() {
        return (
            <div className='result-page'>
                {
                    this.state.status === 'loading' ? <Spinner /> : this.renderResultBlock()
                }
            </div>
        );
    }
}
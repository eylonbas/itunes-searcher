import React from 'react';

export default function MediaVideoPlayer(props) {
    return (
        <video
            className={
                props.type === 'music-video' ?
                    'video-preview' : 'song-preview'
            }
            controls
            autoPlay>
            <source
                src={props.previewUrl}
                type='audio/x-m4a'
            />
        </video>
    );
}
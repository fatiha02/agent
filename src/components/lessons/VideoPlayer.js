'use client';

import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, onEnded, onProgress, playerRef, onPlay }) => {
    if (!url) return null;

    return (
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <ReactPlayer
                ref={playerRef}
                url={url}
                width="100%"
                height="100%"
                controls={true}
                onEnded={onEnded}
                onProgress={onProgress}
                onPlay={onPlay}
                config={{
                    file: {
                        attributes: {
                            controlsList: 'nodownload'
                        }
                    }
                }}
            />
        </div>
    );
};

export default VideoPlayer;

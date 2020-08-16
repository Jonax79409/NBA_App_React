import React from 'react';
import VideosList from '../../../Widgets/VideosList/VideosList.js';

const VideoMain = () => (
    <VideosList
        type="card"
        title={false}
        loadMore={true}
        start={0}
        amount={10}
    />
)

export default VideoMain;
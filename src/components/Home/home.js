import React from 'react';
import NewsSlider from '../Widgets/NewsSlider/slider.js';
import NewsList from '../Widgets/NewsList/NewsList.js'
import VideosList from '../Widgets/VideosList/VideosList.js'

const Home = () => {
    return (
        <div>
            <NewsSlider
                type="featured"
                start={0}
                amount={3}
                settings = {{
                    dots:false
                }}
            />
            <NewsList
                type="card"
                loadmore={true}
                start={0}
                amount={3}
            />
            <VideosList
                type="card"
                title={true}
                loadmore={true}
                start={0}
                amount={3}
            />
        </div>
    )
}

export default Home;
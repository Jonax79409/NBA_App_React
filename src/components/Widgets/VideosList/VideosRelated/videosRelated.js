import React from 'react';
import styles from '../VideosList.module.css';

import VideosListTemplate from '../VideosListTemplate.js'

const videosRelated = (props) => (
    <div className={styles.relatedWrapper}>
        <VideosListTemplate
            data={props.data}
            teams={props.teams}
        />
    </div>
)

export default videosRelated;
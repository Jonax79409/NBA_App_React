import React from 'react';
import styles from '../article.module.css';
import moment from 'moment';

const formatDate = (data) => {
    return moment (data).format (' MM-DD-YY');
}

const postData = (props) => {
    return (<div className={styles.articlePostData}>
        <div>
            Date:
            <span>{formatDate(props.data.date)}</span>
        </div>
        <div>
            Author: 
            <span>{props.data.author}</span>
        </div>
    </div>)
    
}

export default postData;
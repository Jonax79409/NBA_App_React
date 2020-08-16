import React, { Component } from 'react';
import styles from './VideosList.module.css';
import { firebaseTeams, firebaseVideos, firebaseLooper } from '../../../firebase.js';
//import axios from 'axios';

//import { URL } from '../../../config.js';
import Button from '../Buttons/button.js';
import VideosListTemplate from './VideosListTemplate.js';

class VideosList extends Component {
    state = {
        teams:[],
        videos:[],
        start:this.props.start,
        amount:this.props.amount,
        end:this.props.start + this.props.amount
    }

     componentWillMount () {
         this.request(this.state.start,this.state.end)
     }

    renderTitle = () => {
        return this.props.title ?
            <h3><strong>NBA</strong> Videos</h3> 
         : null
    }

    request = (start,end) => {
        if (this.state.teams.length < 1) {
            
            firebaseTeams.once ('value')
            .then ((snapshot) => {
                const teams = firebaseLooper(snapshot);
                this.setState ({
                    teams
                })
            })

            // axios.get (`${URL}/teams`)
            // .then (response => {
            //     this.setState ({
            //         teams:response.data
            //     })
            // })
        }

        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then ((snapshot) => {
            const videos = firebaseLooper(snapshot);
            this.setState ({
                videos:[...this.state.videos,...videos],
                start,
                end
            })
        })
        .catch ((e) => {
            console.log (e)
        })

        // axios.get (`${URL}/videos?_start=${start}&_end=${end}`)
        // .then (response => {
        //     this.setState({
        //         videos:[...this.state.videos,...response.data],
        //         start,
        //         end
        //     })
        // })
    }

    renderVideos = () => {
        let template = null;

        switch(this.props.type) {
            case ('card') :
                template = <VideosListTemplate data={this.state.videos} teams={this.state.teams}/>
            break;

            default : template = null;
        }

        return template;
    }

    loadMore = () => {
        
        let end = this.state.end + this.state.amount
        this.request (this.state.end+1,end)
    }

    renderButton = () => {
        return this.props.loadmore ? 
            <Button 
                type="loadmore"
                loadMore={()=>this.loadMore()}
                cta="Load More Videos"
            />
            : 
            <Button type='linkTo' cta='More Videos' linkTo='/videos'/>
    }


    render() {
        return (
            <div className={styles.videoList_wrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        )
    }
}

export default VideosList;
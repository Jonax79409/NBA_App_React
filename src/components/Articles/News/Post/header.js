import React from 'react';
import TeamInfo from '../../Elements/teaminfo.js';
import PostData from '../../Elements/postData.js';

const header = (props) => {

    //console.log (props.teamData)
    const teamInfo = (team) => {
        return team ? 
        <TeamInfo team={team} />
        :
        null

    }

    const postData = (date, author) => (
        <PostData data={{date,author}}/>
    )

    return (
        <div>
            {teamInfo(props.teamData)}
            {postData(props.date, props.author)}
        </div>
    )
}

export default header;
import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import avatar from './avatar.png';

const RightMessage =({message})=>{

    const styleRight = {
        display: 'flex',
        flexShrink: '0',
        flexDirection: 'row-reverse',
        marginLeft: 'auto'
    }
    const rightmsg = (
            <div key={message.id} className="chat-message-right pb-4" >
                <div>
                    <img src={message['fromUser.profileImage'] ? message['fromUser.profileImage'] :avatar } className="rounded-circle mr-1" alt= {message['fromUser.firstName'] + " " + message['fromUser.lastName']} width="40" height="40"/>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3" style={{marginRight:'16px'}}>
                    <div  className="text-muted small mb-1">You  -  <ReactTimeAgo date={message.createdAt} locale="en-US"/></div>
                    {message.content}
                </div>
            </div>
          );
    return (rightmsg)
}

RightMessage.propTypes ={
    message: PropTypes.object.isRequired
};

  
export default RightMessage;
// export default CartItem
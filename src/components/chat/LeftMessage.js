import React from 'react';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago'
import avatar from './avatar.png';

// key={product.inventoryId}
const LeftMessage =({message})=>{

    const styleLeft = {
        display: 'flex',
        flexShrink: '0',
        marginRight: 'auto'
    }
    const leftmsg = (
            <div key={message.id} className="chat-message-left pb-4" style={styleLeft}>
                <div>
                    <img src={message['fromUser.profileImage'] ? message['fromUser.profileImage'] :avatar } className="rounded-circle mr-1" alt= {message['fromUser.firstName'] + " " + message['fromUser.lastName']} width="40" height="40"/>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3" style={{marginLeft:'16px'}}>
                    <div className="text-muted small mb-1">{message['fromUser.firstName'] + " " + message['fromUser.lastName']} -   <ReactTimeAgo date={message.createdAt} locale="en-US"/></div>
                    {message.content}
                </div>
            </div>
          );
    return (leftmsg)
}

LeftMessage.propTypes ={
    message: PropTypes.object.isRequired
};

  
export default LeftMessage;
// export default CartItem
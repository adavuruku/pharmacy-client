import React,{useState, useContext, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../utils/baseUrl';
import Users from './Users'
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'
import avatar from './avatar.png';
import debounce from 'lodash.debounce';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';

import PropTypes from 'prop-types'; //an npm package to validate the prop types send to this component
import RightMessage from './RightMessage';
import LeftMessage from './LeftMessage';
import io from 'socket.io-client'
let socket;

const ChatHome = ({userInfo}) => {
	// console.log(userInfo)
    const [allUsers, setAllUsers] = useState([]) 
    const [allChats, setAllChat] = useState([]) 
    const [currentUser, setcurrentUser] = useState('Loading...') 
    const [page, setPage] = useState(1)
    const [reachEnd, setReachEnd] = useState(false)
    const [message, setMessage] = useState('')

	// const ENDPOINT = 'ws://127.0.0.1:3000/';
    // const socket = io(ENDPOINT)
	const onChange = e => setMessage(e.target.value);

	const scrollToBottom = useScrollToBottom();

	useEffect(() => {
		socket = io('ws://127.0.0.1:3000/')
		socket.on("connect", () => {
			console.log('Socket Connected')
		});
		let channelId = userInfo.userId + '-new-chat'
        socket.on(channelId, (msg) => {
			console.log('na-new-chat',channelId, msg)
			// let newChats = [...allChats,...msg]
			// setAllChat([...newChats])
			scrollToBottom()
			setAllChat(allChats => [...allChats, msg[0]]);
			const chatMessage = document.querySelector(".chat-messages")
			console.log(chatMessage, chatMessage.scrollTop)
			// chatMessage.scrollTop = chatMessage.scrollHeight;
            // setMessages(messages => [...messages, msg]);
        })
    }, [])

	const sendMessage = () =>{
		console.log(message)
		if(message.length > 0){
			const record = {
				fromUserId: userInfo.userId,
				toUserId:currentUser.userId,
				content:message
			}
			socket.emit('new-chat-post', record)
			setMessage('');
		}
		
	}
    useEffect(() => {
        handleSeach()
    }, [])

    //update category
    const handleSeach = async() => {
        const config = {headers:{'Content-Type':'application/json'}}
        try {
            setAuthToken(localStorage.token)
            const res = await axios.get(`${baseUrl}/api/user/chat/consultants/${userInfo.userId}/${userInfo.isConsultant}`, config)
			console.log(res.data.userInformation)
			setcurrentUser({...res.data.userInformation[0]})
            setAllUsers(res.data.userInformation)
        } catch (error) {
            console.log(error)
        }
    }

	useEffect(() => {
        fetchUserChat()
    }, [currentUser])

	const mystyle = {
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    };
	
	if(document.getElementsByClassName('chat-messages')[0]){
		let div = document.getElementsByClassName('chat-messages')[0]
		div.onscroll = debounce(() => {
			if(div.scrollTop == 0)
			{
				console.log("Reached the top!");
				if(!reachEnd){
					setPage(page + 1)
					fetchUserChat()
				}
			}
		},100)
	}
		
	const fetchUserChat = async() => {
        const config = {headers:{'Content-Type':'application/json'}}
		console.log(page)
        try {
            setAuthToken(localStorage.token)
			console.log('before fetching ',currentUser)
            const res = await axios.get(`${baseUrl}/api/user/chat/my/${currentUser.userId}/${page}`, config)
			if(res.data.chats.length > 0){
				// add more items to the chat array
				console.log(res.data.chats,'all previos',allChats)
				const newPageChat = res.data.chats.reverse()
				let newChats = [...newPageChat, ...allChats]
				setAllChat([...newChats])
				console.log(newChats)
				setPage(page + 1)

				//call the method that will mark them all as read
			}else{
				setReachEnd(true)
			}
        } catch (error) {
            console.log(error)
        }
    }

	const onUserClicked = (user)=>{
		console.log('clik fetch', currentUser)
		if(user.userId !== currentUser.userId){
			console.log(user)
			setPage(1)
			setReachEnd(false)
			setcurrentUser({...user})
			setAllChat([])
		}
		
		console.log(page)
	}
	

	const chatMessage = {
		display: 'flex',
    	flexDirection: 'column',
    	maxHeight: '400px',
    	minHeight:'400px',
    	'overflow-y': 'scroll'
		
	}

	const ROOT_CSS = {
		height: 600,
		width: 400
	  };
	
    let allUsersItem = allUsers.map(ele => <Users onUserClicked = {onUserClicked} user ={ele}/>)
   let htmlItemsl = (
    <div className="container p-0">
		<div className="card">
			<div class="row g-0 border-right">
				<div className="col-12 col-lg-5 col-xl-3 border-right" style={{maxHeight: '500px',minHeight:'500px','overflow-y': 'scroll'}}>
					<div className="px-4 d-none d-md-block">
						<div className="d-flex align-items-center">
							<div className="flex-grow-1">
								<input type="text" className="form-control my-3" placeholder="Search..."/>
							</div>
						</div>
					</div>
					{allUsersItem}
					<hr className="d-block d-lg-none mt-1 mb-0"/>
				</div>
				<div className="col-12 col-lg-7 col-xl-9">
					<div className="py-2 px-4 border-bottom d-none d-lg-block">
						<div className="d-flex align-items-center py-1">
						<img src={currentUser.profileImage ? currentUser.profileImage : avatar} className="rounded-circle mr-4" style={{marginRight:'18px'}} alt= {currentUser.firstName + " " + currentUser.lastName} width="40" height="40"/>
							<div className="flex-grow-1 pl-3">
								<strong>{currentUser.firstName + " "+ currentUser.lastName}</strong>
								<div className="text-muted small"><em>{currentUser.phone}</em></div>
							</div>
						</div>
					</div>

					<div className="position-relative">
						<ScrollToBottom debug={false}>
							<div  className="chat-messages p-4" style={chatMessage}>
								{allChats.length > 0? allChats.map(eachChat => userInfo.userId === eachChat.fromUserId? (<RightMessage message = {eachChat}/>) : (<LeftMessage message = {eachChat}/>)): (
									(
										<div class="row justify-content-centre" style={mystyle}>
											<div className="card-body text-center">
												<p className="text-mute"><strong>Theres no conversation between both of you.</strong></p>
											</div>
										</div>
		  							)
		  						)}
							</div>
						</ScrollToBottom>
						
					</div>

					<div className="flex-grow-0 py-3 px-4 border-top">
						<div className="input-group">
							<input type="text" class="form-control" name='message' onChange ={onChange} value = {message} placeholder="Type your message"/>
							<button onClick = {sendMessage} class="btn btn-primary">Send</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
   )

   return htmlItemsl
}


ChatHome.propTypes = {
    userInfo: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    userInfo: state.login.user
});
  
// export default CheckOutAddAddress;
export default connect(mapStateToProps, null)(ChatHome);

// export default ChatHome;
// export default connect(null, null)(ChatHome));

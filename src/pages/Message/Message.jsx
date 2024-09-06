import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from '../../Components/SearchUser/SearchUser';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import {
  createMessage,
  getAllChat,
} from '../../Redux/Message/message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { uploadToCloudinary } from '../../utils/uploadToCloundniry';
import UserChatCard from './UserChatCar';

const Message = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const message = useSelector((state) => state.message);
  const navigate = useNavigate(); // Use useNavigate hook

  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const sock = new SockJS('http://localhost:8080/api/ws');
    const stomp = Stomp.over(sock);
    setStompClient(stomp);
    stomp.connect({}, onConnect, onError);
  }, []);

  const onConnect = () => {
    console.log('websocket connected.....');
    if (stompClient && currentChat) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageReceive
      );
      console.log(
        `Subscribed to /user/${currentChat.id}/private`
      );
    }
  };

  const onError = (e) => {
    console.log('Error....', e);
  };

  useEffect(() => {
    if (
      stompClient &&
      stompClient.connected &&
      auth.user &&
      currentChat
    ) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageReceive
      );
      console.log(
        `Subscribed to /user/${currentChat.id}/private`
      );
      return () => {
        console.log(
          `Unsubscribed from /user/${currentChat.id}/private`
        );
        subscription.unsubscribe();
      };
    }
  }, [stompClient, auth.user, currentChat]);

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      console.log(
        'Sending message to server: ',
        newMessage
      );
      stompClient.send(
        `api/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    } else {
      console.log(
        'Unable to send message: stompClient or newMessage is missing'
      );
    }
  };

  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    console.log(
      'message received from websocket ',
      receivedMessage
    );
    setMessages((prevMessages) => [
      ...prevMessages,
      receivedMessage,
    ]);
  };

  useEffect(() => {
    dispatch(getAllChat());
  }, [dispatch]);

  useEffect(() => {
    if (message.message) {
      setMessages((prevMessages) => [
        ...prevMessages,
        message.message,
      ]);
    }
  }, [message.message]);

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgUrl = await uploadToCloudinary(
      e.target.files[0],
      'image'
    );
    setSelectedImage(imgUrl);
    setLoading(false);
  };

  const handleCreateMessage = (value) => {
    const newMessage = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
      senderId: auth.user?.id,
    };
    dispatch(
      createMessage({
        message: newMessage,
        sendMessageToServer,
      })
    );
    setSelectedImage('');
  };

  return (
    <div>
      <Grid
        container
        className="h-screen overflow-y-hidden"
      >
        <Grid item xs={3} className="px-5">
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon onClick={() => navigate('/')} />
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div>
                  <SearchUser />
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollBar">
                  {message.chats.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setCurrentChat(item);
                          setMessages(item.messages);
                        }}
                      >
                        <UserChatCard item={item} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-1 p-5">
                <div className="flex items-center space-x-3">
                  <Avatar src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg" />
                  <p>
                    {auth.user?.id ===
                    currentChat.users[0]?.id
                      ? `${currentChat.users[1].firstName} ${currentChat.users[1].lastName}`
                      : `${currentChat.users[0].firstName} ${currentChat.users[0].lastName}`}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <CallIcon />
                  </IconButton>
                  <IconButton>
                    <VideocamIcon />
                  </IconButton>
                </div>
              </div>
              <div className="hideScrollBar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
                {messages.map((item, index) => (
                  <ChatMessage key={index} item={item} />
                ))}
              </div>
              <div className="sticky bottom-0 border-1">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    src={selectedImage}
                    alt=""
                  />
                )}
                <div className="flex py-5 items-center justify-center space-x-5">
                  <input
                    onKeyPress={(e) => {
                      if (
                        e.key === 'Enter' &&
                        e.target.value
                      ) {
                        handleCreateMessage(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5"
                    type="text"
                    placeholder="Can't you chat everything..."
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon
                sx={{ fontSize: '15rem' }}
              />
              <p className="text-x1 font-bold">
                No Chat Selected
              </p>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;

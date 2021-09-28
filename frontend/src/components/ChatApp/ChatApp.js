import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get_chat_groups, get_messages } from "../../redux";
import Chat from "./chat/Chat";
import Sidebar from "./sidebar/Sidebar";

function ChatApp({ getGroups, getMessages }) {
  useEffect(() => {
    /*
      Runs on mount of this component. 
      Creates a websocket instance and connects
      to the /chat/ endpoint.

      Receives two types of messages: 
        group_list = list of groups that the user is in
        messages = list of messages in the selected chat
    
    */
    const socket = new WebSocket("ws://localhost:8000/chat/");

    socket.addEventListener("open", (event) => {
      console.log("Connected!");
    });

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      console.log("message", message);
      switch (message["type"]) {
        case "groups":
          return getGroups(JSON.parse(message["group_list"]));

        case "messages":
          return getMessages(message["message_list"]);
      }
    });

    socket.addEventListener("close", (event) => {
      console.log("Disconnected!");
      socket.close();
    });
  }, []);

  return (
    <>
      <Sidebar />
      <Chat />
    </>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: (chat_group_object) => {
      dispatch(get_chat_groups(chat_group_object));
    },
    getMessages: (messages) => {
      dispatch(get_messages(messages));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);

import React from "react";
import { RiMessengerLine } from "react-icons/ri";
import MessengerCustomerChat from "react-messenger-customer-chat";

const Message = () => {
  return (
    <div className="text-blue-600 mr-auto">
      <RiMessengerLine className="text-4xl" />
      <MessengerCustomerChat
        pageId="103523232499808"
        appId="1066323601321012"
      />
    </div>
  );
};

export default Message;

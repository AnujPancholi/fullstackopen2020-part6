import React from 'react'
import {useSelector} from "react-redux";

const Notification = () => {

  const messageText = useSelector(state => state.notification_message)

  const getStyle = (isVisible=false) =>{
    return {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      display: isVisible ? "block" : "none"
    }
  } 
  return (
    <div style={getStyle(typeof(messageText)==="string" && messageText.length>0)}>
      {messageText}
    </div>
  )
}

export default Notification
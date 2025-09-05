import React, { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "system", text: "Welcome! How can we help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async() => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    SetIntput("");
    try{
      const response = await axios.post(`https://job-portal-backend-15.onrender.com/api/chat`,{
        messages:input,
        senderId:'uers',
        applicationId:'12345'
        })

      if(response.statues === 200){
        setMessages([...messages, { sender: "user", text: input }, ...response.data])
      }
    }catch(err){  
      console.log(err)
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border shadow-lg rounded-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-2 font-semibold">
        💬 Chat Support
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 h-64 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-1 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 outline-none"
        />
        <button
          onClick={handleSend}
          className="px-4 bg-blue-600 text-white hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

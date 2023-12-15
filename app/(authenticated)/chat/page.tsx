"use client";

import FullRoundedButton from "#/app/Component/fullRoundedButton";
import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo!", sender: "user" },
    { id: 2, text: "Hai! Ada yang bisa saya bantu?", sender: "bot" },
    // ...pesan lainnya
  ]);

  const sendMessage = () => {
    // Logika untuk mengirim pesan
  };

  return (
    <div className="bg-orange-200 w-full h-screen p-10 flex flex-col justify-end ">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 rounded-lg my-3 ${
              message.sender === "user" ? "bg-white " : "bg-green-300"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center p-4">
        <input
          type="text"
          placeholder="Ketik pesan..."
          className="flex-1 p-2 rounded-full border-none outline-none"
        />
        <FullRoundedButton text="Kirim" onclick={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;

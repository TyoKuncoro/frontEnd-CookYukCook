"use client";

import FullRoundedButton from "#/app/Component/fullRoundedButton";
import React, { useState } from "react";
import Image from "next/image";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo!", sender: "user" },
    { id: 2, text: "Hai! Ada yang bisa saya bantu?", sender: "bot" },
    // ...pesan lainnya
  ]);

  const sendMessage = () => {
    alert("fungsi kirimnya lain kali ya mr. Tyo dancok yg gantreng");
    // Logika untuk mengirim pesan
  };

  const kembali = () => {
    alert("fungsinya lain kali ya mr. Tyo dancok yg gantreng");
  };

  return (
    <div className="bg-orange-200 w-full h-screen flex flex-col justify-end rounded-lg ">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-orange-400 flex  text-white justify-between">
          <div
            className="flex items-center place-content-center w-[4%]"
            style={{ cursor: "pointer" }}
            onClick={kembali}
          >
            <Image
              className="border-r-2 border-white rounded"
              src="/assets/ArrowLeftOutlined.png"
              width={25}
              height={25}
              alt="Gambar"
            />
          </div>
          <div className="flex mr-6 ">
            <div className="items-center text-lg font-semibold flex">
              Dapur Rey
            </div>
            <Image
              className=" rounded m-3"
              src="/assets/account.png"
              width={60}
              height={60}
              alt="Gambar"
            />
          </div>
        </div>
        {messages.map((message) => (
          <div>
            {message.sender === "user" ? (
              <div className="flex place-content-end">
                <div
                  key={message.id}
                  className={`p-2 rounded-lg m-3 ${"bg-green-300 "}`}
                >
                  {message.text}
                </div>
                <Image
                  className=" rounded m-3"
                  src="/assets/account.png"
                  width={60}
                  height={60}
                  alt="Gambar"
                />
              </div>
            ) : (
              <div className="flex place-content-">
                <Image
                  className=" rounded m-3"
                  src="/assets/account.png"
                  width={60}
                  height={60}
                  alt="Gambar"
                />
                <div
                  key={message.id}
                  className={`p-2 rounded-lg m-3 ${"bg-white"}`}
                >
                  {message.text}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center p-4 bg-orange-400 fixed w-[85.5%] justify-center rounded-lg bottom-8">
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

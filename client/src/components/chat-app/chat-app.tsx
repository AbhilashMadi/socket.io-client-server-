import ChatFooter from "@chat-app/chat-footer";
import ChatMessagesList from "@chat-app/chat-messages-list";
import { ChangeEvent, useEffect, useState, type FC } from "react";
import { Manager, Socket } from "socket.io-client";
import ChatHeader from "./chat-header";

const manager = new Manager("http://localhost:8080", { autoConnect: false });
const socket: Socket = manager.socket("/");

const ChatApp: FC = () => {
  const [socketId, setSocketId] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClearInput = () => {
    setInput("");
  };

  const handleMessageSend = () => {
    if (input.trim()) {
      socket.emit("message", input);
      handleClearInput();
    }
  };

  const connectSocket = async () => {

    socket.connect();

    socket.on("connect", () => {
      const socketId = socket.id;
      setSocketId(socketId ?? '');
      console.log("Connected to socket server: " + socketId);
    });

    socket.on("message", (message: string) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <main className="h-dvh w-full flex-center">
      <div className="w-[32rem] flex flex-col gap-2">
        <ChatHeader socketId={socketId} />
        <ChatMessagesList messages={messages} />
        <ChatFooter
          handleInputChange={handleInputChange}
          handleMessageSend={handleMessageSend}
          input={input}
        />
      </div>
    </main>
  );
};

export default ChatApp;

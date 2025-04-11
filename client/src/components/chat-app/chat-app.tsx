import ChatFooter from "@chat-app/chat-footer";
import ChatMessagesList from "@chat-app/chat-messages-list";
import { ChangeEvent, FormEvent, useEffect, useState, type FC } from "react";
import { Manager, Socket } from "socket.io-client";
import ChatHeader from "./chat-header";

const manager = new Manager("http://localhost:8080", { autoConnect: false });
const socket: Socket = manager.socket("/");

// eslint-disable-next-line react-refresh/only-export-components
export enum FormKeys {
  MESSAGE = 'message',
  ROOM_ID = 'room_id',
}

const ChatApp: FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socketId, setSocketId] = useState<string>('');

  const formIntialState = {
    [FormKeys.MESSAGE]: '',
    [FormKeys.ROOM_ID]: '',
  }

  const [formState, setFormState] = useState<Record<FormKeys, string>>(formIntialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((pre) => ({ ...pre, [name]: value }));
  };

  const handleFormReset = (): void => {
    setFormState(formIntialState);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const message = formState?.[FormKeys.MESSAGE].trim();
    const room = formState?.[FormKeys.ROOM_ID].trim();

    if (!message) return;

    if (room) {
      socket.emit('message', { message, room });
    } else {
      socket.emit('message', { message });
    }

    handleFormReset();
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
          handleFormSubmit={handleFormSubmit}
          handleFormReset={handleFormReset}
          formState={formState}
        />
      </div>
    </main>
  );
};

export default ChatApp;

import { type FC } from "react";

const ChatHeader: FC<{ socketId: string }> = ({ socketId }) => {
  return (<header className="p-2 border bg-white rounded-md shadow-sm text-center">
    {socketId}
  </header>)
}
export default ChatHeader;
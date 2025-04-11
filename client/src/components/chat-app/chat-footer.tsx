import { ChangeEvent, type FC } from "react";

const ChatFooter: FC<{
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageSend: () => void;
  input: string;
}> = ({
  handleInputChange,
  handleMessageSend,
  input,
}) => {

    return (<form className="mx-auto w-full flex gap-2">
      <input
        type="text"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        placeholder="Type your message here..."
        required
        onChange={handleInputChange}
        value={input}
      />
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleMessageSend}
      >Default</button>
    </form>)
  }

export default ChatFooter;
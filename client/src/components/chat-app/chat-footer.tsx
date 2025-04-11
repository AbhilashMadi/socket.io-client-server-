import { ChangeEvent, FormEvent, type FC } from "react";
import { FormKeys } from "./chat-app";

const ChatFooter: FC<{
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleFormReset: () => void;
  formState: Record<FormKeys, string>;
}> = ({
  handleInputChange,
  handleFormSubmit,
  formState,
  handleFormReset,
}) => {

    return (<form className="mx-auto w-full grid grid-cols-2 gap-2" onSubmit={handleFormSubmit} onReset={handleFormReset}>
      <input
        type="text"
        className="border border-gray-30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        placeholder="Message..."
        required
        onChange={handleInputChange}
        name={FormKeys.MESSAGE}
        value={formState?.[FormKeys.MESSAGE]} />
      <input
        type="text"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        placeholder="Room ID"
        onChange={handleInputChange}
        name={FormKeys.ROOM_ID}
        value={formState?.[FormKeys.ROOM_ID]} />
      <div className="flex gap-2 col-start-2">
        <button
          type="submit"
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send</button>
        <button
          type="reset"
          className="focus:outline-none w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-400 dark:hover:bg-red-700 dark:focus:ring-red-900">Reset</button>
      </div>
    </form>)
  }

export default ChatFooter;
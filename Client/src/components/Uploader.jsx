import { IoCloudUploadOutline } from "react-icons/io5";

export const Uploader = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 p-8 mt-12 bg-white rounded-lg max-w-md mx-auto">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors w-full"
        >
          <IoCloudUploadOutline className="text-6xl text-indigo-500" />
          <span className="text-gray-600 font-medium">
            Click to upload files
          </span>
          <span className="text-sm text-gray-400">
            PDF, DOCX, or TXT (Max. 5MB)
          </span>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt"
          />
        </label>
      </div>
      <div className="flex justify-center">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-[5px] cursor-pointer hover:bg-purple-800">
          Try InsightCV
        </button>
      </div>
    </>
  );
};

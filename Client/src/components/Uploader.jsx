import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { Modal } from "./DescModal";
import { handleFileUploader } from "../lib/axios";

export const Uploader = () => {
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [jobdesc, setJobdesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBtnfile = () => {
    // console.log(file);
    if (!file) {
      Swal.fire({
        title: "Please select a file",
        text: "PDF, or TXT (Max. 5MB) file are accepted",
        showConfirmButton: true,
      });
    }

    setShowModal(true);
  };

  const handleDesc = (desc) => {
    // console.log("description", desc);

    setShowModal(false);
    handleFileUpload();
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobdesc", jobdesc);

    setIsLoading(true);
    const res = await handleFileUploader(formData);

    if (!res.success) {
      Swal.fire({
        text: "Something went wrong",
      });
    } else {
      Swal.fire({
        title: "Resume Suggestion",
        text: res.message,
        showConfirmButton: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center gap-6 p-8 mt-12  rounded-lg max-w-md mx-auto `}
      >
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors w-full ${
            file && "bg-zinc-100"
          }`}
        >
          <IoCloudUploadOutline className="text-6xl text-indigo-500" />
          <span className="text-gray-600 font-medium">
            Click to upload files
          </span>
          <span className="text-sm text-gray-400">
            {file ? `${file.name}` : "PDF, or TXT (Max. 5MB)"}
          </span>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf ,.txt"
          />
        </label>
      </div>
      <div className="flex justify-center">
        <button
          disabled={isLoading}
          onClick={handleBtnfile}
          className="bg-indigo-600 text-white px-4 py-2 rounded-[5px] cursor-pointer hover:bg-purple-800"
        >
          {isLoading ? "Analyzing..." : "Try InsightCV"}
        </button>
      </div>
      <Modal
        show={showModal}
        onClose={setShowModal}
        onSubmit={handleDesc}
        setJobdesc={setJobdesc}
        jobdesc={jobdesc}
      />
    </>
  );
};

import { useState } from "react";

export const Modal = ({ show, onClose, onSubmit, setJobdesc, jobdesc }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0  flex items-center opacity-90 justify-center z-50">
      <div className="bg-zinc-100 rounded-lg p-6 w-[90%] max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Enter Job Description</h2>
        <textarea
          rows="5"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Write your job description here..."
          value={jobdesc}
          onChange={(e) => setJobdesc(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-purple-800"
            onClick={() => onSubmit(jobdesc)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

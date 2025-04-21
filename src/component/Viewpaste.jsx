import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Viewpaste = () => {
  const { id } = useParams();
  const allpaste = useSelector((state) => state.paste.pastes);
  const paste = allpaste.find((p) => p._id === id);

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-screen">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          View Paste
        </h2>

        <input
          type="text"
          placeholder="Enter Title Here"
          value={paste?.title || ""}
          disabled
          className="p-3 w-full rounded-xl border border-gray-300 shadow-sm mb-4 text-gray-700 font-semibold"
        />

        <textarea
          value={paste?.content || ""}
          placeholder="Enter Content Here"
          disabled
          rows={15}
          className="w-full p-4 rounded-xl border border-gray-300 shadow-sm text-gray-700"
        ></textarea>

        <div className="text-sm text-gray-500 mt-4 text-right">
          📅 {new Date(paste?.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default Viewpaste;

import { useState, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [vale, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allpaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allpaste.find((p) => p._id == pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: vale,
      _id: pasteId || Date.now().toString(35),
      createdAt: new Date().toISOString(),
    
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      toast.success("Updated Successfully");
    } else {
      dispatch(addToPastes(paste));
      toast.success("Created Successfully");
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(vale);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-screen">
      <div className="bg-white  rounded-none shadow-md p-6">
        {/* Title + Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 w-full">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
          />
          <button
            onClick={createPaste}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition w-full md:w-auto"
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>
        </div>

        {/* Code Editor Style Box */}
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-gray-50 relative w-full">
          {/* Top Bar with Dots */}
          <div className="flex space-x-2 px-4 py-2 bg-white border-b border-gray-200">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* Copy Icon */}
          <button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 text-gray-600 hover:text-blue-600 transition"
            title="Copy"
          >
            <FaRegCopy size={18} />
          </button>

          {/* Textarea */}
          <textarea
            className="w-full p-5 bg-transparent outline-none resize-none min-h-[400px]"
            value={vale}
            placeholder="Write Your Content Here....."
            onChange={(e) => setValue(e.target.value)}
            rows={20}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Home;

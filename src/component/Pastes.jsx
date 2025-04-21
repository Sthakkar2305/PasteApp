import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  FaTrashAlt,
  FaRegCopy,
  FaEdit,
  FaEye,
  FaShareAlt,
} from "react-icons/fa";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchterm, setSearchterm] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchterm.toLowerCase())
  );

  function handledelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handlecopy(content) {
    navigator.clipboard.writeText(content);
    toast.success("Copied To Clipboard");
  }

  function handleShare(paste) {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
        })
        .then(() => toast.success("Shared successfully!"))
        .catch(() => toast.error("Sharing failed"));
    } else {
      toast.error("Sharing not supported on this browser.");
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-screen">
      <div className="bg-white  rounded-none shadow-md p-6">
        <input
          type="search"
          className="p-3 w-full rounded-xl border border-gray-300 shadow-sm mb-6"
          placeholder="Search paste here..."
          value={searchterm}
          onChange={(e) => setSearchterm(e.target.value)}
        />

        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          All Pastes
        </h2>

        <div className="flex flex-col gap-6">
          {filterData.length > 0 &&
            filterData.map((paste) => (
              <div
                key={paste?._id}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200 w-full"
              >
                <div className="text-xl font-semibold text-gray-800 break-words">
                  {paste.title}
                </div>
                <div className="text-gray-600 mt-1 break-words">
                  {paste.content}
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 gap-3 flex-wrap">
                  <div className="flex gap-4 text-gray-700 text-lg">
                    <Link to={`/?pasteId=${paste?._id}`} title="Edit">
                      <FaEdit className="hover:text-blue-600 cursor-pointer" />
                    </Link>
                    <Link to={`/paste/${paste?._id}`} title="View">
                      <FaEye className="hover:text-green-600 cursor-pointer" />
                    </Link>
                    <FaTrashAlt
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => handledelete(paste?._id)}
                      title="Delete"
                    />
                    <FaRegCopy
                      className="hover:text-purple-600 cursor-pointer"
                      onClick={() => handlecopy(paste?.content)}
                      title="Copy"
                    />
                    <FaShareAlt
                      className="hover:text-orange-500 cursor-pointer"
                      onClick={() => handleShare(paste)}
                      title="Share"
                    />
                  </div>

                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span>📅</span>
                    {formatDate(paste.createdAt)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Pastes;

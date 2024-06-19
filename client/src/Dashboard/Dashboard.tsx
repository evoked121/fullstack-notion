import React, { useEffect, useState } from "react";
import { Block } from "../interfaces";
import axios from "axios";

export default function Dashboard() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [showTextForm, setShowTextForm] = useState(false);
  const [showTextUpdateForm, setShowTextUpdateForm] = useState(false);
  const [style, setStyle] = useState("H1");
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [showImageForm, setShowImageForm] = useState(false);
  const [showImageUpdateForm, setShowImageUpdateForm] = useState(false);

  const [src, setSrc] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const cleanUpText = () => {
    setContent("");
    setStyle("H1");
  };

  const cleanUpImage = () => {
    setSrc("");
    setWidth("");
    setHeight("");
  };

  const addText = async () => {
    try {
      const {
        data: { success, blocks },
      } = await axios.post("http://localhost:5002/api/add-block", {
        type: "text",
        content: content,
        style: style,
        src: "",
        width: "",
        height: "",
      });
      cleanUpText();
      if (success === true) {
        setBlocks(blocks);
        return console.log("add text succesfully");
      } else {
        return console.log("some errors happen");
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const updateText = async () => {
    try {
      const {
        data: { success, blocks },
      } = await axios.put(`http://localhost:5002/api/update/${id}`, {
        type: "text",
        content: content,
        style: style,
        src: "",
        width: "",
        height: "",
      });
      cleanUpText();
      if (success === true) {
        setBlocks(blocks);
        return console.log("add text succesfully");
      } else {
        return console.log("some errors happen");
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const updateImage = async () => {
    try {
      const {
        data: { success, blocks },
      } = await axios.put(`http://localhost:5002/api/update/${id}`, {
        type: "image",
        content: "",
        style: "",
        src: src,
        width: width,
        height: height,
      });
      cleanUpImage();
      if (success === true) {
        setBlocks(blocks);

        return console.log("add image succesfully");
      } else {
        return console.log("some errors happen");
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const addImage = async () => {
    try {
      const {
        data: { success, blocks },
      } = await axios.post("http://localhost:5002/api/add-block", {
        type: "image",
        content: "",
        style: "",
        src: src,
        width: width,
        height: height,
      });
      cleanUpImage();
      if (success === true) {
        setBlocks(blocks);
        return console.log("add image succesfully");
      } else {
        return console.log("some errors happen");
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      cleanUpText();
      cleanUpImage();
      const {
        data: { success, blocks },
      } = await axios.delete(`http://localhost:5002/api/delete/${id}`);
      if (success === true) {
        setBlocks(blocks);
        return console.log("add image succesfully");
      } else {
        return console.log("some errors happen");
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleSubmit = (type: string) => {
    if (type === "text") {
      addText();
    } else {
      addImage();
    }
  };

  const handleUpdate = (type: string) => {
    if (type === "text") {
      updateText();
    } else {
      updateImage();
    }
  };

  useEffect(() => {
    const getBlocks = async () => {
      try {
        const res = await axios.get("http://localhost:5002/api/get-all-blocks");
        if (res.data.success === true) {
          setBlocks(res.data.blocks);
        } else {
          return console.log("internal error");
        }
      } catch (error) {
        return console.log("error");
      }
    };
    getBlocks();
  }, []);

  return (
    <div className="flex flex-col overflow-auto">
      <div className="flex flex-col py-10 bg-[#d7d6d6]">
        <div className="mx-auto text-3xl font-bold">
          Fullstack Takehome - Notion - Haoran Wang
        </div>
      </div>
      <div className="flex flex-row justify-end px-4 mt-4">
        <div className="flex flex-row gap-3">
          <button
            onClick={() => setShowTextForm(true)}
            className="px-4 py-2 text-sm font-bold rounded-full inline-flex items-center border border-transparent bg-[#d7d6d6] text-black hover:bg-[#f8f7f7]"
          >
            Add Text
          </button>
          <button
            onClick={() => setShowImageForm(true)}
            className="px-4 py-2 text-sm font-bold rounded-full inline-flex items-center border border-transparent bg-[#d7d6d6] text-black hover:bg-[#f8f7f7]"
          >
            Add Image
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-4 px-10 gap-5">
        {blocks.map((block) => (
          <div key={block._id}>
            {block.type === "text" ? (
              <button
                onClick={() => {
                  setContent(block.content);
                  setStyle(block.style);
                  setId(block._id);
                  setShowTextUpdateForm(true);
                }}
                className="inline-flex"
              >
                {block.style === "H1" && (
                  <div className="text-4xl font-bold">{block.content}</div>
                )}
                {block.style === "H2" && (
                  <div className="text-3xl font-semibold">{block.content}</div>
                )}
                {block.style === "H3" && (
                  <div className="text-2xl font-medium">{block.content}</div>
                )}
                {block.style === "paragraph" && (
                  <div className="text-base">{block.content}</div>
                )}
              </button>
            ) : (
              <button
                className="inline-flex"
                onClick={() => {
                  setSrc(block.src);
                  setWidth(block.width);
                  setHeight(block.height);
                  setId(block._id);
                  setShowImageUpdateForm(true);
                }}
              >
                <img
                  src={block.src}
                  alt="Image Block"
                  style={{
                    width: Number(block.width),
                    height: Number(block.height),
                  }}
                />
              </button>
            )}
          </div>
        ))}
      </div>
      {showTextForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="flex flex-col bg-white p-6 h-[350px] rounded">
            <h2 className="text-xl font-bold mb-4">Add Text Block</h2>
            <textarea
              className="border p-2 w-full h-[40%] mb-4"
              placeholder="put your idea here!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="mt-2 text-base font-medium mb-2">
              Select your font
            </div>
            <select
              className="border p-2 w-full mb-4"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="H1">Font: H1</option>
              <option value="H2">Font: H2</option>
              <option value="H3">Font: H3</option>
              <option value="paragraph">Font: Paragraph</option>
            </select>
            <div className="flex justify-end">
              <button
                className="mr-2 p-2 bg-gray-300 rounded"
                onClick={() => {
                  cleanUpText();
                  setShowTextForm(false);
                }}
              >
                Cancel
              </button>
              <button
                disabled={!content}
                style={{
                  cursor: !content ? "not-allowed" : "pointer",
                }}
                className="p-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  handleSubmit("text");
                  setShowTextForm(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showTextUpdateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="flex flex-col bg-white p-6 h-[400px] rounded">
            <h2 className="text-xl font-bold mb-4">Update Text Block</h2>
            <div className="mt-2 text-base font-medium mb-2">Update Text</div>
            <textarea
              className="border p-2 w-full h-[40%] mb-4"
              placeholder="put your idea here!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="mt-2 text-base font-medium mb-2">Update Font</div>
            <select
              className="border p-2 w-full mb-4"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="H1">Font: H1</option>
              <option value="H2">Font: H2</option>
              <option value="H3">Font: H3</option>
              <option value="paragraph">Paragraph</option>
            </select>
            <div className="flex justify-end">
              <button
                className="mr-2 p-2 bg-gray-300 rounded"
                onClick={() => {
                  cleanUpText();
                  setShowTextUpdateForm(false);
                }}
              >
                Cancel
              </button>
              <button
                className="mr-2 p-2 bg-gray-300 rounded"
                onClick={() => {
                  handleDelete();
                  setShowTextUpdateForm(false);
                }}
              >
                Delete
              </button>
              <button
                className="p-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  handleUpdate("text");
                  setShowTextUpdateForm(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showImageForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="flex flex-col bg-white h-[330px] w-[300px] p-6 rounded">
            <h2 className="text-xl font-bold mb-4 mt-2">Add Image Block</h2>
            <input
              className="border p-2 w-full mb-4"
              type="text"
              placeholder="Image URL"
              value={src}
              onChange={(e) => setSrc(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-4"
              type="number"
              placeholder="Width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-4"
              type="number"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="mr-2 p-2 bg-gray-300 rounded"
                onClick={() => {
                  cleanUpImage();
                  setShowImageForm(false);
                }}
              >
                Cancel
              </button>
              <button
                disabled={!src || !width || !height}
                style={{
                  cursor: !src || !width || !height ? "not-allowed" : "pointer",
                }}
                className="p-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  handleSubmit("image");
                  setShowImageForm(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showImageUpdateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="flex flex-col bg-white h-[430px] w-[300px] p-6 rounded">
            <h2 className="text-xl font-bold mb-4 mt-2">Update Image Block</h2>
            <div className="mt-2 text-base font-medium mb-2">
              Update Image Url
            </div>
            <input
              className="border p-2 w-full mb-4"
              type="text"
              placeholder="You can change Image URL"
              value={src}
              onChange={(e) => setSrc(e.target.value)}
            />
            <div className="mt-2 text-base font-medium mb-2">Update Width</div>
            <input
              className="border p-2 w-full mb-4"
              type="number"
              placeholder="You can change Width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
            <div className="mt-2 text-base font-medium mb-2">Update Height</div>
            <input
              className="border p-2 w-full mb-4"
              type="number"
              placeholder="You can change Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="mr-2 p-2 bg-gray-300 rounded"
                onClick={() => {
                  cleanUpImage();
                  setShowImageUpdateForm(false);
                }}
              >
                Cancel
              </button>
              <button
                className="mr-2 p-2 bg-gray-300 rounded"
                onClick={() => {
                  handleDelete();
                  setShowImageUpdateForm(false);
                }}
              >
                Delete
              </button>
              <button
                className="p-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  handleUpdate("image");
                  setShowImageUpdateForm(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import axios from "axios";

function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getthepost = async () => {
    try {
      const r = await axios.get("https://blogging-platform-backend-1.onrender.com/getpost");
      setData(Array.isArray(r.data) ? r.data : []);
    } catch (e) {
      console.error("error in fetching", e);
    }
  };

  const deletethepost = async (_id) => {
    try {
      const r = await axios.delete(`https://blogging-platform-backend-1.onrender.com/deletepost/${_id}`);
      console.log(r);
      setData((prevData) => prevData.filter((blog) => blog._id !== _id));
    } catch (e) {
      console.error("error in deleting", e);
    }
  };

  const handleEditClick = (post) => {
    setEditPost(post);
    setIsDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const r = await axios.put(`https://blogging-platform-backend-1.onrender.com/editpost/${editPost._id}`, editPost);
      console.log(r);
      setData((prevData) =>
        prevData.map((post) => (post._id === editPost._id ? editPost : post))
      );
      setIsDialogOpen(false);
    } catch (e) {
      console.error("error in updating", e);
    }
  };

  useEffect(() => {
    getthepost();
  }, []);

  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="relative mb-20 mt-5 text-center ">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 bg-gray-700 text-white px-10 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {filteredData.map((post) => (
          <Card key={post._id} className="w-full sm:w-96 mb-6">
            <CardHeader className="relative h-56">
              <img
                src="https://imgs.search.brave.com/ZS13rQPlihAPQqXoMeWmjjArlINNcjuwe7heJIjoxF0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmpkbWFnaWNi/b3guY29tL2NvbXAv/ZXJuYWt1bGFtL2Q1/LzA0ODRweDQ4NC54/NDg0LjE4MTAyNzE1/NTAyMS5pNGQ1L2Nh/dGFsb2d1ZS9sdW1p/bmFyLXRlY2hub2xh/Yi1rYWtrYW5hZC1l/cm5ha3VsYW0tY29t/cHV0ZXItdHJhaW5p/bmctaW5zdGl0dXRl/cy1mb3ItcHl0aG9u/LXQzNmwzd2gxMDAu/anBnP3c9Mzg0MCZx/PTc1"
                alt="card-image"
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography
                variant="h5"
                color="textPrimary"
                className="mb-2 font-bold text-3xl"
              >
                {post.title}
              </Typography>
              <Typography color="textSecondary" className="font-bold">
                CONTENT
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                className="mb-2"
              ></Typography>
              {post.content}
              <Typography color="textSecondary" className="font-bold">
                AUTHOR
              </Typography>
              <Typography color="textSecondary">{post.authorname}</Typography>
              <Typography color="textSecondary" className="font-bold">
                DOM
              </Typography>
              <Typography color="textSecondary">{post.date}</Typography>
              <Typography color="textSecondary" className="font-bold">
                TAGS
              </Typography>
              <Typography color="textSecondary">{post.tags}</Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-between">
              <MdDelete
                className="text-2xl hover:text-red-800 cursor-pointer"
                onClick={() => deletethepost(post._id)}
              />
              <MdEdit
                className="text-2xl hover:text-red-800 cursor-pointer"
                onClick={() => handleEditClick(post)}
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      {editPost && (
        <Dialog open={isDialogOpen} handler={setIsDialogOpen}>
          <DialogHeader>Edit Post</DialogHeader>
          <DialogBody>
            <Input
              label="Title"
              name="title"
              value={editPost.title}
              onChange={handleEditChange}
            />
            <Input
              label="Content"
              name="content"
              value={editPost.content}
              onChange={handleEditChange}
            />
            <Input
              label="Author"
              name="authorname"
              value={editPost.authorname}
              onChange={handleEditChange}
            />
            <Input
              label="Date"
              name="date"
              value={editPost.date}
              onChange={handleEditChange}
            />
            <Input
              label="Tags"
              name="tags"
              value={editPost.tags}
              onChange={handleEditChange}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="gradient" color="black" onClick={handleEditSubmit}>
              Save
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
}

export default Blogs;
import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import axios from "axios";

function Addpost() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorname, setAuthorName] = useState("");
  const [date, setCreatedDate] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleOpen = () => setOpen((cur) => !cur);

  const addingthepost = async () => {
    if (!title || !content || !authorname || !date || !tags) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      const r = await axios.post("https://blogging-platform-backend-1.onrender.com/addpost", {
        title,
        content,
        authorname,
        date,
        tags,
      });
      console.log("Post added:", r.data);
      alert("post added sucessfully")
      handleOpen(); // Close the dialog after successful submission
    } catch (e) {
      console.error("Error in adding post", e);
      alert("failed to post")
    }
  };

  return (
    <div className="text-center m-2">
      <Button onClick={handleOpen}>Add post</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add post
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your blog details
            </Typography>
            {error && <Typography color="red">{error}</Typography>}
            <Typography className="-mb-2" variant="h6">
              Title
            </Typography>
            <Input
              label="Title"
              size="lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Content
            </Typography>
            <Input
              label="Content"
              size="lg"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Author Information
            </Typography>
            <Input
              label="Author name"
              size="lg"
              value={authorname}
              onChange={(e) => setAuthorName(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Created Date of Month
            </Typography>
            <Input
              label="DOM"
              size="lg"
              value={date}
              onChange={(e) => setCreatedDate(e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Tags
            </Typography>
            <Input
              label="Tags"
              size="lg"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={addingthepost} fullWidth>
              Add Post
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}

export default Addpost;
import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlogLikes, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      const response = await blogService.update(blog.id, updatedBlog);
      const updatedBlogWithUser = { ...response, user: blog.user };
      updateBlogLikes(updatedBlogWithUser);
    } catch (error) {
      console.error("Error updating blog likes:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`remove blog "${blog.title}"?`)) {
      try {
        await blogService.remove(blog.id);
        deleteBlog(blog.id);
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisible}>{visible ? "hide" : "view"}</button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes {blog.likes} <button onClick={handleLike}>Like</button>
          </p>
          <p>{blog.user.name}</p>
          <p>
            {currentUser && currentUser.username === blog.user.username && (
              <button onClick={handleDelete}>Delete</button>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;

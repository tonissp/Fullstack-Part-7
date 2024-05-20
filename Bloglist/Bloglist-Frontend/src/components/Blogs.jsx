import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import blogService from "../services/blogs";

const Blogs = ({ blogs, addBlog, updateBlogLikes, deleteBlog, user }) => {
  const [visibleBlogs, setVisibleBlogs] = useState([]);

  const toggleVisible = (blogId) => {
    if (visibleBlogs.includes(blogId)) {
      setVisibleBlogs(visibleBlogs.filter((id) => id !== blogId));
    } else {
      setVisibleBlogs([...visibleBlogs, blogId]);
    }
  };

  const isBlogVisible = (blogId) => visibleBlogs.includes(blogId);

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      const response = await blogService.update(blog.id, updatedBlog);
      const updatedBlogWithUser = { ...response, user: blog.user };
      updateBlogLikes(updatedBlogWithUser);
    } catch (error) {
      console.error("Error updating blog likes:", error);
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`remove blog "${blog.title}"?`)) {
      try {
        await blogService.remove(blog.id);
        deleteBlog(blog.id);
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  function compareLikes(a, b) {
    return b.likes - a.likes;
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="create">
        <BlogForm createBlog={addBlog} user={user.name} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.sort(compareLikes).map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>
                  <Button onClick={() => toggleVisible(blog.id)}>
                    {isBlogVisible(blog.id) ? "Hide" : "Show"}
                  </Button>
                </TableCell>
                <TableCell>
                  {isBlogVisible(blog.id) && `${blog.likes} likes`}
                </TableCell>
                <TableCell>
                  {isBlogVisible(blog.id) && (
                    <Button onClick={() => handleLike(blog)}>Like</Button>
                  )}
                </TableCell>
                <TableCell>
                  {isBlogVisible(blog.id) &&
                    user &&
                    user.username === blog.user.username && (
                      <Button onClick={() => handleDelete(blog)}>Delete</Button>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;

import { useState } from "react";

const BlogForm = ({ createBlog, user }) => {
  const [newBlog, setNewBlog] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    const author = blogAuthor.trim() === "" ? user : blogAuthor;

    setBlogAuthor(author);

    createBlog({
      title: newBlog,
      author: author,
      url: blogUrl,
      user: user,
    });

    setNewBlog("");
    setBlogAuthor("");
    setBlogUrl("");
  };

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            data-testid="title"
            id="title"
            value={newBlog}
            onChange={(event) => setNewBlog(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            data-testid="author"
            id="author"
            value={blogAuthor}
            onChange={(event) => setBlogAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            data-testid="url"
            id="url"
            value={blogUrl}
            onChange={(event) => setBlogUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;

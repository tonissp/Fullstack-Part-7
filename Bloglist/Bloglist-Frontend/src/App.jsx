import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import NavBar from "./components/Navigation";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import Login from "./components/Login";
import { Container, Button } from "@mui/material";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    userService.getAll().then((users) => setUsers(users));
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setErrorMessage("login successful");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
    setErrorMessage("logout successful");
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const addBlog = async (blogObject) => {
    try {
      if (!blogObject.title || !blogObject.url) {
        setErrorMessage("The blog is missing necessary information");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return;
      }

      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setErrorMessage(`A new blog '${blogObject.title}' successfully added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);

      const updatedUsers = await userService.getAll();
      setUsers(updatedUsers);
    } catch (error) {
      setErrorMessage("Error adding blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const updateBlogLikes = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
    );
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <Router>
      <Container>
        <NavBar user={user} handleLogout={handleLogout} />
        <Notification message={errorMessage} />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Blogs
                  blogs={blogs}
                  addBlog={addBlog}
                  updateBlogLikes={updateBlogLikes}
                  deleteBlog={deleteBlog}
                  user={user}
                />
              ) : (
                <div>
                  <h2>log in to application</h2>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowLoginForm(!showLoginForm)}
                  >
                    {showLoginForm ? "Cancel" : "Login"}
                  </Button>
                  {showLoginForm && <Login onLogin={handleLogin} />}
                </div>
              )
            }
          />
          <Route
            path="/users"
            element={
              user ? (
                <Users users={users} />
              ) : (
                <div>
                  <h2>log in to application</h2>
                  {showLoginForm && <Login onLogin={handleLogin} />}
                </div>
              )
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

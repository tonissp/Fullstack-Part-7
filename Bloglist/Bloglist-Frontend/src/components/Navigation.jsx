import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

const Navigation = ({ user, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        {user ? (
          <div style={{ marginLeft: "auto" }}>
            <em>{user.name} logged in</em>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button color="inherit" component={Link} to="/">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

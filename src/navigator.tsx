import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "./hooks/useAuthState";
import { About } from "./pages/About";
import { CreatePost } from "./pages/CreatePost";
import { Dashboard } from "./pages/Dashboard";
import { EditPost } from "./pages/EditPost";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Post } from "./pages/Post";
import { Register } from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";
import { Search } from "./pages/Search";

const Navigator = () => {
  const user = useAuthState();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/posts/edit/:id"
          element={user ? <EditPost /> : <Navigate to="/" />}
        />
        <Route
          path="/posts/create"
          element={user ? <CreatePost /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard createdBy={user.uid} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
};

export { Navigator };

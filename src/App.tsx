import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import { useAuthState } from "./hooks/useAuthState";
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Search from "./pages/Search";

const AppContent = () => {
  const user = useAuthState();

  return (
    <AuthProvider value={{ user }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="posts/create" element={<CreatePost />} />
          <Route path="posts/edit/:id" element={<EditPost />} />
          <Route path="posts/:id" element={<Post />} />
          <Route path="dashboard" element={<Dashboard createdBy={user?.email || ""} />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="resetPassword" element={<ResetPassword />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Spinner } from "./components/Spinner";
import { useAuthState } from "./hooks/useAuthState";

const About = lazy(() => import("./pages/About"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const EditPost = lazy(() => import("./pages/EditPost"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Post = lazy(() => import("./pages/Post"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Search = lazy(() => import("./pages/Search"));

const Navigator = () => {
  const user = useAuthState();

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Spinner />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/" />} />
        <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard createdBy={user.uid} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Suspense>
  );
};

export { Navigator };

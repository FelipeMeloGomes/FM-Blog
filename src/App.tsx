import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ToastContainer } from "./components/Toast";
import { AuthProvider } from "./context/AuthContext";
import { ColorModeProvider } from "./contexts/ColorModeContext";
import { useAuthState } from "./hooks/useAuthState";
import { ToastProvider } from "./providers/ToastProvider";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const EditPost = lazy(() => import("./pages/EditPost"));
const Post = lazy(() => import("./pages/Post"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Search = lazy(() => import("./pages/Search"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Profile = lazy(() => import("./pages/Profile"));

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
  </div>
);

const AppContent = () => {
  const user = useAuthState();

  return (
    <AuthProvider value={{ user }}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="posts/create" element={<CreatePost />} />
            <Route path="posts/edit/:id" element={<EditPost />} />
            <Route path="posts/:id" element={<Post />} />
            <Route path="dashboard" element={<Dashboard createdBy={user?.email || ""} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="resetPassword" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ColorModeProvider>
        <ToastProvider>
          <ToastContainer />
          <AppContent />
        </ToastProvider>
      </ColorModeProvider>
    </BrowserRouter>
  );
};

export default App;

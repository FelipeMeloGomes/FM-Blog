import { Box, Spinner } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import { useAuthState } from "./hooks/useAuthState";

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

const PageLoader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
    <Spinner size="lg" color="text.secondary" />
  </Box>
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
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

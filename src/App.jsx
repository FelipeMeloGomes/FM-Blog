// React Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Firebase auth
import { onAuthStateChanged } from "firebase/auth";

// Hooks
import { useEffect, useState } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// Context
import { AuthProvider } from "./context/AuthContext";

// Components
import NavBar from "./components/NavBar/NavBar";
import Spinner from "./components/Spinner/Spinner";
import LayoutPage from "./components/LayoutPage/LayoutPage";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";
import Search from "./pages/Search/Search";
import Post from "./pages/Post/Post";
import EditPost from "./pages/EditPost/EditPost";
import NotFound from "./pages/NotFound/NotFound";
import Weather from "./pages/Weather/Weather";

function App() {
    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();

    const loadingUser = user === undefined;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [auth]);

    if (loadingUser) {
        return <Spinner />;
    }

    return (
        <div className="App">
            <AuthProvider value={{ user }}>
                <BrowserRouter>
                    <LayoutPage>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<NotFound />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/posts/:id" element={<Post />} />
                            <Route
                                path="/login"
                                element={
                                    !user ? <Login /> : <Navigate to="/" />
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    !user ? <Register /> : <Navigate to="/" />
                                }
                            />
                            <Route
                                path="/posts/edit/:id"
                                element={
                                    user ? <EditPost /> : <Navigate to="/" />
                                }
                            />
                            <Route
                                path="/posts/create"
                                element={
                                    user ? (
                                        <CreatePost />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    user ? (
                                        <Dashboard />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                            <Route
                                path="/weather"
                                element={
                                    user ? (
                                        <Weather />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                        </Routes>
                    </LayoutPage>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "./hooks/useAuthentication";
import { Spinner } from "./components/Spinner";

// Pages
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { About } from "./pages/About";
import { Post } from "./pages/Post";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EditPost } from "./pages/EditPost";
import { CreatePost } from "./pages/CreatePost";
import { Dashboard } from "./pages/Dashboard";
import { Weather } from "./pages/Weather";
import { Search } from "./pages/Search";

const Navigator = () => {
    const [user, setUser] = useState<User | null>(null);

    const { auth } = useAuthentication();

    const loadingUser = user === undefined;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [auth]);

    if (loadingUser) {
        return <Spinner />;
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route path="/posts/:id" element={<Post />} />
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
                        user ? (
                            <Dashboard createdBy={undefined} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/weather"
                    element={user ? <Weather /> : <Navigate to="/login" />}
                />
            </Routes>
        </>
    );
};

export { Navigator };

// React Router
import { BrowserRouter } from "react-router-dom";

// Firebase auth
import { User, onAuthStateChanged } from "firebase/auth";

// Hooks
import { useEffect, useState } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// Context
import { AuthProvider } from "./context/AuthContext";

// Components
import { NavBar } from "./components/NavBar";
import { Spinner } from "./components/Spinner";
import { LayoutPage } from "./components/LayoutPage";
import { Navigator } from "./navigator";

const App: React.FC = () => {
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
        <div className="App">
            <AuthProvider value={{ user }}>
                <BrowserRouter>
                    <LayoutPage>
                        <NavBar />
                        <Navigator />
                    </LayoutPage>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
};

export default App;

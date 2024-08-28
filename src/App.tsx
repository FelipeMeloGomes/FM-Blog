// React Router
import { BrowserRouter } from "react-router-dom";

// Context
import { AuthProvider } from "./context/AuthContext";

// Components
import { NavBar } from "./components/NavBar";
import { LayoutPage } from "./components/LayoutPage";
import { Navigator } from "./navigator";
import { useAuthState } from "./hooks/useAuthState";

const App: React.FC = () => {
  const user = useAuthState();

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

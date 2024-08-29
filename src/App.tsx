import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NavBar } from "./components/NavBar";
import { LayoutPage } from "./components/LayoutPage";
import { Navigator } from "./navigator";
import { useAuthState } from "./hooks/useAuthState";

const App = () => {
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

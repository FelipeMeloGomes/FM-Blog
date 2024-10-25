import { BrowserRouter } from "react-router-dom";
import { LayoutPage } from "./components/LayoutPage";
import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import { useAuthState } from "./hooks/useAuthState";
import { Navigator } from "./navigator";

const App = () => {
  const user = useAuthState();

  return (
    <AuthProvider value={{ user }}>
      <BrowserRouter>
        <LayoutPage>
          <NavBar />
          <Navigator />
        </LayoutPage>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

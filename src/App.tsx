import { Navigate, Routes } from "react-router";
import { Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import useAuth from "./hooks/useAuth";
import useUser from "./hooks/useUser";
import MainLayout from "./components/layouts/MainLayout";
import HomePage from "./pages/HomePage";

function App() {
  useAuth();
  const user = useUser();

  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route element={user ? <MainLayout /> : <Navigate to="/auth" />}>
          <Route
            path="/"
            element={<HomePage/>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

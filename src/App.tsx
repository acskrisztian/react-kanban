import { Navigate, Routes, useNavigate } from "react-router";
import { Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import useAuth from "./hooks/useAuth";
import useUser from "./hooks/useUser";
import MainLayout from "./components/layouts/MainLayout";
import HomePage from "./pages/HomePage";
import useBoards from "./hooks/useBoards";
import BoardPage from "./pages/BoardPage";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useAuth();
  const user = useUser();
  const boards = useBoards(user?.id);

  useEffect(() => {
    if (boards.length > 0) {
      navigate(`/board/${boards[0].id}`);
    }
  }, [boards]);

  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route element={user ? <MainLayout /> : <Navigate to="/auth" />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/board/:id" element={<BoardPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

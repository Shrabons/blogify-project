import { Route, Routes } from "react-router-dom";

import LayoutSetup from "./layout/LayoutSetup";
import EditBlogPage from "./pages/EditBlogPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewAddBlogPage from "./pages/NewAddBlogPage";
import NotFoundPage from "./pages/NotFoundPages";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import PrivateRoutes from "./routes/PrivateRoutes";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<LayoutSetup />}>
          <Route element={<PrivateRoutes />}>
            <Route element={<HomePage />} path="/" exact />
            <Route element={<ProfilePage />} path="/profile" />
            <Route element={<SingleBlogPage />} path="/blog-details" />
            <Route element={<NewAddBlogPage />} path="/createBlog" />
            <Route element={<EditBlogPage />} path="/editBlog" />
          </Route>

          <Route element={<LoginPage />} path="/Login" />
          <Route element={<RegistrationPage />} path="/register" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </>
  );
}

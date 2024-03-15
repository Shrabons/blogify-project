import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import BlogsProvider from "../providers/BlogsProvider";
import ProfileProvider from "../providers/ProfileProvider";

const LayoutSetup = () => {
  return (
    <>
      <ProfileProvider>
        <BlogsProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </BlogsProvider>
      </ProfileProvider>
    </>
  );
};

export default LayoutSetup;

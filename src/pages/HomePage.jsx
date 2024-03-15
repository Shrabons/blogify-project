import BlogContent from "../components/home/BlogContent";
import Sidebar from "../components/home/Sidebar";

const HomePage = () => {
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <BlogContent />
          <Sidebar />
        </div>
      </div>
    </section>
  );
};

export default HomePage;

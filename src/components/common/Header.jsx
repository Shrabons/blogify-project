import { Link, useNavigate } from "react-router-dom";
import SearachIcon from "../../assets/icons/search.svg";
import logo from "../../assets/logo.svg";
import { useAuthenticatin } from "../../hooks/useAuthentication";
import { useProfile } from "../../hooks/useProfile";
import { useProfileImage } from "../../hooks/useProfileImage";

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthenticatin();
  const { userProfileImg } = useProfileImage();
  const { state } = useProfile();

  let firstChar = auth?.user?.firstName.charAt(0).toUpperCase();

  const handleLogOut = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <header>
      <nav className="container">
        <div>
          <Link to="/">
            <img className="w-32" src={logo} alt="lws" />
          </Link>
        </div>

        <div>
          <ul className="flex items-center space-x-5">
            {auth?.user && (
              <>
                <li>
                  <Link
                    to="/createBlog"
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                  >
                    Write
                  </Link>
                </li>
                <li>
                  <a
                    href="./search.html"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img src={SearachIcon} alt="Search" />
                    <span>Search</span>
                  </a>
                </li>
              </>
            )}
            <li>
              {auth?.user ? (
                <button
                  onClick={handleLogOut}
                  type="button"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  {" "}
                  LogOut{" "}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  {" "}
                  Login{" "}
                </Link>
              )}
            </li>
            {auth?.user && (
              <li className="flex items-center">
                <Link className="flex items-center" to="/profile">
                  {auth?.user?.avatar === null && state.user == undefined ? (
                    <div className="avater-img bg-green-600 text-white">
                      <span className="">{firstChar}</span>
                    </div>
                  ) : (
                    <div className="avater-img rounded-full">
                      <img
                        className=" avater-img rounded-full"
                        src={`${import.meta.env.VITE_SERVER_IMAGE_UP_URL}/${
                          userProfileImg.avatar
                        }`}
                        alt={userProfileImg.firstName}
                      />
                    </div>
                  )}

                  <span className="text-white ml-2">
                    {userProfileImg.firstName} {userProfileImg.lastName}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

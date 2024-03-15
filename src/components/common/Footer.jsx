import {
  FaFacebook,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="my-6 md:my-8 bg-[#030317]">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/">
          <img className="w-28" src={Logo} alt="lws" />
        </a>
        <ul className="flex items-center space-x-5">
          <li className="text-center">
            <a
              className="text-white/50 hover:text-white transition-all duration-200"
              href="#"
            >
              <FaFacebook className="text-2xl" />
            </a>
          </li>
          <li className="text-center">
            <a
              className="text-white/50 hover:text-white transition-all duration-200"
              href="#"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </li>
          <li className="text-center">
            <a
              className="text-white/50 hover:text-white transition-all duration-200"
              href="#"
            >
              <FaTwitter className="text-2xl" />
            </a>
          </li>
          <li className="text-center">
            <a
              className="text-white/50 hover:text-white transition-all duration-200"
              href="#"
            >
              <FaPinterestP className="text-2xl" />
            </a>
          </li>
          <li className="text-center">
            <a
              className="text-white/50 hover:text-white transition-all duration-200"
              href="#"
            >
              <FaYoutube className="text-2xl" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

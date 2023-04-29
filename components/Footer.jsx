import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full py-10 bg-globalBgColor px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center">
        <div className="flex gap-6">
          <BsYoutube className="w-7 h-7 text-secondaryColor/80 hover:text-white duration-300 cursor-pointer" />
          <BsFacebook className="w-7 h-7 text-secondaryColor/80 hover:text-white duration-300 cursor-pointer" />
          <BsGithub className="w-7 h-7 text-secondaryColor/80 hover:text-white duration-300 cursor-pointer" />
          <BsLinkedin className="w-7 h-7 text-secondaryColor/80 hover:text-white duration-300 cursor-pointer" />
          <BsTwitter className="w-7 h-7 text-secondaryColor/80 hover:text-white duration-300 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

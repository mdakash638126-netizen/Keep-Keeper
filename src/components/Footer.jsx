
// import { Code2, } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-[#244D35] text-white py-6 mt-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 text-center ">

        <h2 className="font-bold text-4xl text-[#ffffff]">KeenKeeper</h2>
        <p className="font-16px text-gray-400">Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>
         <p>Social Links</p>
        <div className="flex justify-center items-center gap-4 mt-4 space-y-4">
           
            <a href="" target="_blank" rel="noopener noreferrer">
                <FaFacebookF size={24} className="text-white hover:text-blue-500 transition-colors" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
                <FaXTwitter  size={24} className="text-white hover:text-blue-500 transition-colors" />

            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} className="text-white hover:text-pink-500 transition-colors " />
            </a>

            {/* <a href="https://www.twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <FaXTwitter size={24} className="text-white hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} className="text-white hover:text-pink-500 transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn size={24} className="text-white hover:text-blue-700 transition-colors" />
            </a> */}
            {/* Add more social links here */}
        </div>
        <div className="flex justify-around text-center items-center mt-4 text-sm text-gray-300">
            <p>© 2026 KeenKeeper. All rights reserved.</p>
           <div className="flex gap-4">
             <span>Privacy Policy</span>
            <span>Terms of Service </span>
            <span>Cookies</span>
           </div>
        </div>
        {/* <p className="flex items-c  enter justify-center gap-2">
          Made with <Heart size={16} className="text-red-300" /> usi ng
          KeenKeeper
        </p> */}
        

        {/* <div className="flex justify-center items-center gap-2 mt-2">
          <Code2 size={18} />
          <span>Keep in touch with the people who matter.</span>
        </div> */}

        {/* <p className="text-sm mt-3 text-green-100">
          © {new Date().getFullYear()} KeenKeeper. All rights reserved.
        </p> */}
      </div>
    </footer>
  );
}

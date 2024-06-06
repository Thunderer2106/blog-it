import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex  flex-col sm:flex-row  w-full justify-between  ">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              BlOG IT
            </Link>
          </div>
          <div className=" sm:items-center ">
            
            <div className="flex gap-6  mt-4 s">
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsInstagram} />
              <Footer.Icon href="#" icon={BsTwitter} />
              <Footer.Icon
                href="https://github.com/Thunderer2106"
                icon={BsGithub}
              />
              <Footer.Icon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
        <Footer.Divider />
      </div>
    </Footer>
  );
}

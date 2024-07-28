import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsSendFill } from "react-icons/bs";
import { sendEmail } from "../utils/renders";
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";
import { BsSendCheckFill } from "react-icons/bs";

function NavBar(props) {
  const [isPressed, setIsPressed] = useState(false);
  // eslint-disable-next-line
  const [userEmail, setUserEmail] = useState("");
  const ref = useRef(null);

  // eslint-disable-next-line
  const userData = props.data;

  const navigate = useNavigate();
  const logoutHandle = async () => {
    try {
      ref.current.staticStart();

      localStorage.removeItem("User");
      toast.success("Logout Successfully!!");
      ref.current.complete();

      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <LoadingBar color="orange" ref={ref}></LoadingBar>
      <div className="flex flex-row justify-between w-screen h-24 bg-yellow-400">
        <div className="relative mt-2 text-4xl font-bold tracking-wider text-red-500 left mochiy-pop-one-regular top-5 left-6 ">
          <p className="text-black">
            <span className="text-white">Expense</span> Tracker
          </p>
        </div>

        <div></div>
        <div className="flex flex-row justify-end w-1/3">
          <div className="w-auto pl-4 pr-4 mt-6 mb-6 mr-16 rounded-xl ">
            <div
              className="relative z-50 inline-flex group"
              onClick={() => setIsPressed(!isPressed)}
            >
              <div className="/"></div>
              <div
                title=""
                className="relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold tracking-wider text-white transition-all duration-200 bg-black font-pj rounded-xl focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-900 hover:text-black hover:bg-white"
                role="button"
              >
                Email
                <BsSendCheckFill className="text-lg" />
              </div>
            </div>
            {
              <>
                <div
                  className={`flex flex-col  overflow-hidden ${
                    isPressed
                      ? "opacity-100 mt-8 w-1/4"
                      : "opacity-0 ml-20 w-0 -mt-10"
                  } justify-between transition-all duration-500  h-50 bg-blue-500  gap-3 absolute  p-3 z-40 -ml-48 rounded-xl`}
                >
                  <div
                    className=" text-white absolute -inset-x-2 -inset-y-2 bg-black font-bold rounded-full w-6 pt-0.5 text-center left-0.5 top-1 cursor-pointer h-fit border-2"
                    onClick={() => setIsPressed(!isPressed)}
                  >
                    <p className="-mt-1">x</p>
                  </div>
                  <div className="flex flex-row justify-between gap-3 ">
                    <input
                      placeholder="Your Email"
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                      type="email"
                      className="w-full p-2 pl-4 outline-none rounded-2xl"
                    ></input>
                    <button
                      onClick={() => {
                        sendEmail(userEmail, userData);
                      }}
                      className="p-3 text-2xl text-white rounded-xl w-fit bg-neutral-800"
                    >
                      <BsSendFill></BsSendFill>
                    </button>
                  </div>
                  <p className="text-xs text-center text-white whitespace-nowrap ">
                    **Get your expenses in <b>one month</b>, On Your Email
                  </p>
                </div>
              </>
            }
          </div>

          <div>
            <a
              onClick={logoutHandle}
              href="#_"
              className="relative inline-flex items-center justify-center p-4 px-6 py-3 mt-5 mb-5 overflow-hidden text-xl font-medium text-indigo-600 transition duration-300 ease-out border-2 border-black rounded-full shadow-md right-10 group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-600 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full font-bold text-white transition-all duration-300 transform border-black group-hover:translate-x-full ease">
                LogOut
              </span>
              <span className="relative invisible">LogOut</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

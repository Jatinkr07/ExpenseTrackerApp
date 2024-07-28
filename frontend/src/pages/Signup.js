import React, { useEffect, useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";

function Signup() {
  document.title = "SignUp";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const ref = useRef(null);

  // pervent login again
  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      await axiosClient.post("/auth/signup", {
        username,
        email,
        password,
      });
      // console.log(response.data.message);
      toast.success("Registerd Successfully!!");
      ref.current.complete();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-[#1D1B1B] w-screen h-screen flex flex-row ">
      <LoadingBar color="orange" ref={ref}></LoadingBar>

      <div className="w-2/5 h-screen left ">
        <h1 className="relative w-3/4 pl-10 mt-5 font-thin leading-tight whitespace-pre-wrap text-[#EC4D37] text-7xl top-1/4 left-10">
          <span className="font-bold text-white">Expense</span>
          <br></br>Tracker<br></br>
          <h4 className="mt-12 text-xl text-white">
            "Track, Manage, and Visualize Your Finances with Ease"
          </h4>
        </h1>
      </div>
      <hr className="w-0.5 h-3/4 mt-24 bg-white"></hr>
      <div className="flex items-center justify-center w-3/5 h-screen ">
        <div className="flex flex-col items-center w-3/5 pt-20 gap-7 h-2/3">
          <h1 className="relative text-4xl font-bold text-white -top-10 ">
            SignUp
          </h1>
          <input
            placeholder="UserName"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="h-12 pl-6 transition-all outline-none w-96 rounded-2xl focus:outline-2 focus:outline-white focus:outline-offset-4 "
          ></input>
          <input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="h-12 pl-6 transition-all outline-none w-96 rounded-2xl focus:outline-2 focus:outline-white focus:outline-offset-4 "
          ></input>
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="h-12 pl-6 transition-all outline-none w-96 rounded-2xl focus:outline-2 focus:outline-white focus:outline-offset-4 "
          ></input>
          <button
            onClick={submitForm}
            className="flex items-center justify-center h-12 px-4 py-3 mx-5 font-semibold tracking-wider text-black transition-transform transform bg-yellow-400 shadow-lg outline-none rounded-2xl w-96 focus:ring-4 active:scale-x-75"
          >
            Submit
          </button>
          <p className="-mt-4 text-lg text-white">
            Already Registred! Go to{" "}
            <a
              href="/login"
              className="font-semibold tracking-wider text-blue-600 hover:text-blue-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

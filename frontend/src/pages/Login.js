import React, { useEffect, useState, useRef } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

document.title = "Login";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userdata , setUserdata] = useState({});
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
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      // console.log(response.data);
      if (response.data.statusCode !== 201) {
        toast.error(response.data.message);
        return;
      }
      toast.success("Successfully Logged In !!");
      // setUserdata(response.data.message);
      localStorage.setItem("User", JSON.stringify(response.data.message));
      ref.current.complete();

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-row w-screen h-screen bg-[#1D1B1B]">
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
      <div className="flex items-center justify-center w-3/5">
        <div className="flex flex-col items-center w-3/5 gap-7 h-2/3 pt-28">
          <h1 className="relative text-4xl font-bold text-white -top-10 ">
            Login
          </h1>
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
              // console.log(password)
              setPassword(e.target.value);
            }}
            className="h-12 pl-6 transition-all outline-none w-96 rounded-2xl focus:outline-2 focus:outline-white focus:outline-offset-4 "
          ></input>
          <button
            onClick={submitForm}
            // className="flex items-center justify-center h-12 text-lg font-bold text-center text-white bg-yellow-600 w-96 rounded-2xl "
            className="flex items-center justify-center h-12 px-4 py-3 mx-5 font-semibold tracking-wider text-black transition-transform transform bg-yellow-400 shadow-lg outline-none rounded-2xl w-96 focus:ring-4 active:scale-x-75"
          >
            Submit
          </button>
          <p className="text-white">
            New User ? Go To{" "}
            <a
              className="font-semibold tracking-wider text-blue-600 hover:text-blue-500"
              href="/signup"
            >
              SignUp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

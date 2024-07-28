import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Items from "../components/Items";
import { Chartss } from "../components/Chartss";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from "react-top-loading-bar";
// import { toast } from 'react-hot-toast';
import { createExpense, getUserExpenses } from "../utils/renders";
import NavBar from "../components/NavBar";
import { useRef } from "react";

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem("User")));
  const [userexp, setUserexp] = useState([]);
  const ref = useRef(null);

  document.title = "Home";

  // logout

  useEffect(() => {
    // if delete from application in console
    // eslint-disable-next-line
    if (!localStorage.getItem("User")) {
      navigate("/login");
    }
    // eslint-disable-next-line
    setUserexp(
      Promise.resolve(getUserExpenses(userdata._id)).then((data) =>
        setUserexp(data)
      )
    );
  }, [userdata._id, navigate]);

  const getTotal = () => {
    let sum = 0;
    for (const item in userexp) {
      sum += userexp[item].amount;
    }
    return sum;
  };

  // console.log(userexp)
  return (
    <div className="w-full h-screen bg-[#1D1B1B] font-mont">
      <LoadingBar color="orange" ref={ref}></LoadingBar>
      <NavBar data={userexp}></NavBar>
      {/* Feed */}
      <div className="Feed  w-4/5 left-[calc(100%-90%)] relative h-[calc(100%-6rem)] flex  ">
        <div className="w-1/2 h-full leftbox ">
          <div className="w-full h-full p-6">
            <Chartss exdata={userexp}></Chartss>
          </div>
        </div>
        <div className="flex flex-col items-center w-1/2 gap-10 rightbox ">
          {/* /////////////////////////// */}
          <div className="relative flex flex-col items-center justify-center w-auto gap-2 p-10 pt-6 pb-6 bg-blue-500 createnew rounded-3xl top-5 ">
            <div className="text-3xl font-bold text-white mochiy-pop-one-regular ">
              Create Transaction
            </div>
            <div className="flex flex-row gap-4 ">
              <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount "
                className="w-auto h-12 p-4 text-base placeholder-black outline-none rounded-xl focus:focus-animation "
              ></input>
              <select
                id="countries"
                onChange={(e) => {
                  setCategory(e.target.value);
                  console.log(category);
                }}
                defaultValue="selected"
                className="bg-white w-auto outline-none border placeholder-black border-gray-300 text-gray-900 text-sm rounded-xl block   p-2.5 focus:focus-animation "
              >
                <option value="">--Select--</option>
                <option value="Grocery">Grocery</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Food & Fun">Food & Fun</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid w-full grid-flow-col ">
              <div className="w-full">
                <DatePicker
                  selected={selectDate}
                  onChange={(date) => {
                    console.log(date);
                    setSelectedDate(date);
                  }}
                  className="p-3 px-4 placeholder-black outline-none w-2/2 rounded-xl bg-jp-black placeholder-rp-yellow h-fit text-jp-white focus:focus-animation"
                  placeholderText="Date"
                  showYearDropdown
                />
              </div>

              <a
                onClick={() => {
                  const expInfo = {
                    // amount , category , date , usersid
                    usersid: userdata._id,
                    category,
                    date: selectDate,
                    amount,
                  };
                  ref.current.staticStart();
                  createExpense(expInfo);
                  ref.current.complete();
                }}
                href="#_"
                className="relative w-full px-5 py-2 overflow-hidden text-center text-white transition-all duration-300 ease-out bg-indigo-500 border-2 h-fit rounded-xl group hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-600 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-600"
              >
                <span className="absolute right-0 w-8 h-10 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative text-2xl font-bold">+</span>
              </a>
            </div>
          </div>

          {/* ////////  Creation Ended Here /////////////////// */}

          <div className="relative grid w-5/6 h-auto overflow-y-scroll border-2 border-white p-7 rounded-xl gap-7 ">
            <div className="text-3xl font-bold text-white font-mont ">
              Total Expense : ₹ {getTotal()}
            </div>
            <div className="grid grid-cols-2 listrr gap-7">
              {Object.keys(userexp).map((items) => (
                <Items key={userexp[items]._id} data={userexp[items]}></Items>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

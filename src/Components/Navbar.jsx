import React, { useState } from "react";
import { MdAir } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { fectchAPI } from "../slices/CoordinatesSlice";
import { useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { IoSearch } from "react-icons/io5";
import { searchAPI } from "../slices/searchSlice";


const Navbar = ({ setloader }) => {
  const [hamburger, sethamburger] = useState(false);
  const [searchkey,setsearchkey] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlecurrentlocation = () => {
    if (navigator.geolocation) {
      setloader(true);
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    }
  };

  const locationSuccess = (params) => {
    dispatch(
      fectchAPI({
        latitude: params.coords.latitude,
        longitude: params.coords.longitude,
      })
    );
  };
  const locationError = (err) => {
    
    setloader(false);
  };

  return (
    <>
      <nav className="w-full py-4 px-6   h-fit  relative flex flex-col ">
        <div className="flex text-xl ">
          <div className="flex-1 text-5xl ">
            <MdAir />
          </div>
          <div className="flex-2 max-lg:hidden  rounded-full flex items-center border-2 border-gray-500 px-4">
            <input
              type="text"
              className="w-full outline-none text-sm"
              placeholder="search here..."
              value={searchkey}
              onChange={(e)=>{
                setsearchkey(e.target.value)
              }}
              onKeyDown={(e)=>{
                if(e.key=="Enter"){
                  sethamburger(false);
                  dispatch(searchAPI(searchkey));
                  navigate("/search");
                }
              }}
            />
            <IoSearch />
          </div>
          <div className="flex-2 flex gap-4 max-lg:flex-row-reverse justify-end max-lg:justify-start items-center">
            <ul className="flex max-lg:hidden text-lg gap-10 items-center ">
              <Link to="/">
                <li>Home</li>
              </Link>
              
              <Link to="/aqi">
                <li>AQI?</li>
              </Link>
            </ul>

            <div className="text-3xl cursor-pointer hidden max-lg:block">
              {hamburger ? (
                <IoCloseSharp
                  onClick={() => {
                    sethamburger(false);
                  }}
                />
              ) : (
                <GiHamburgerMenu
                  onClick={() => {
                    sethamburger(true);
                  }}
                />
              )}
            </div>

            <div
              onClick={() => {
                handlecurrentlocation();
              }}
              className="flex  h-full gap-2 cursor-pointer max-lg:aspect-square justify-center hover:bg-gray-300 bg-white text-black items-center px-2 rounded-full"
            >
              <FaLocationDot />
              <span className="max-lg:hidden">Current Location</span>
            </div>
          </div>
        </div>
        <motion.div
          animate={
            hamburger
              ? { height: "auto", marginTop: "10px" }
              : { height: 0, marginTop: 0 }
          }
          className="w-full overflow-hidden hidden max-lg:block  z-90 px-4 "
        >
          <ul className="flex items-center flex-col bg-gray-100/9 gap-10 text-2xl rounded-md  pt-4">
            <Link onClick={()=>{sethamburger(false)}} to="/">
                <li>Home</li>
              </Link>
      
              <Link onClick={()=>{sethamburger(false)}} to="/aqi">
                <li className="pb-4">AQI?</li>
              </Link>
          </ul>
          <div className="flex-2 max-lg:flex px-6 py-2 hidden rounded-full  items-center border-2 border-gray-500  mt-4">
            <input
              type="text"
              className="w-full outline-none text-sm"
              placeholder="search here..."
              value={searchkey}
              onChange={(e)=>{
                setsearchkey(e.target.value)
              }}
              onKeyDown={(e)=>{
                if(e.key=="Enter"){ 
                  sethamburger(false);
                  dispatch(searchAPI(searchkey));
                  navigate("/search");
                }
              }}
            />
            <IoSearch />
          </div>
        </motion.div>
           
      </nav>
    </>
  );
};

export default Navbar;

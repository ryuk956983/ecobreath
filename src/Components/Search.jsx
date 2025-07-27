import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import { fectchAPI } from "../slices/CoordinatesSlice";
import { useNavigate } from "react-router";

const Search = () => {
  const searchResult = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  return searchResult.pending ? (
    <Loader />
  ) : (
    <main className="w-full h-full flex flex-col gap-4 p-4">
      {searchResult.data_first.length == 0 && (
        <h1 className="text-lg text-white ">No data found</h1>
      )}
      {searchResult.data_first.length > 0 &&
        searchResult.data_first.map((el, ind) => (
          <div
            onClick={() => {
              
              dispatch(fectchAPI({latitude:el.lat,longitude:el.lon}));
              navigate("/");
              
            }}
            key={ind}
            className="text-white text-lg cursor-pointer hover:bg-[#262B2F] rounded-md p-4 w-full bg-[#353839]"
          >
            <h1>{el.display_name}</h1>
          </div>
        ))}
    </main>
  );
};

export default Search;

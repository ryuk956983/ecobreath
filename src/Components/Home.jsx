import React, { useEffect, useState } from "react";
import CountUp from "./CountUp";
import LChart from "./LChart";
import { useSelector, useDispatch } from "react-redux";
import { fectchAPI } from "../slices/CoordinatesSlice";
import { change_first_load } from "../slices/CoordinatesSlice";

const Home = ({ setloader }) => {
  const dispatch = useDispatch();
  const coord = useSelector((state) => state.coordinatesSlice);

  const arr = [
    { name: "Carbon Monoxide", key: "carbon_monoxide" },
    {
      name: "Nitrogen Dioxide",
      key: "nitrogen_dioxide",
    },

    { name: "Sulphur Dioxide", key: "sulphur_dioxide" },
    { name: "Ozone", key: "ozone" },
    { name: "Ammonia", key: "ammonia" },
    { name: "Alder Pollen", key: "alder_pollen" },

    { name: "Birch Pollen", key: "birch_pollen" },
    { name: "Grass Pollen", key: "grass_pollen" },
    { name: "Mugwort Pollen", key: "mugwort_pollen" },
    { name: "Olive Pollen", key: "olive_pollen" },
  ];

  const US_STD = (aqi_val) => {
    if (aqi_val >= 0 && aqi_val <= 50) {
      return { level: "Good", color: "bg-[#00e400]" };
    } else if (aqi_val >= 51 && aqi_val <= 100) {
      return { level: "Moderate", color: "bg-[#FFFF00] text-black" };
    } else if (aqi_val >= 101 && aqi_val <= 200) {
      return { level: "Unhealthy", color: "bg-[#FF7E00]" };
    } else if (aqi_val >= 201 && aqi_val <= 300) {
      return { level: "Very Unhealthy", color: "bg-[#FF0000]" };
    } else if (aqi_val >= 301 && aqi_val <= 500) {
      return { level: "Hazardous", color: "bg-[#7E0023]" };
    }
  };

  useEffect( () => {
    if(coord.first_load){
     dispatch(fectchAPI({})); 
     dispatch(change_first_load());
    }
    
  }, [dispatch]);

  useEffect(() => {
    setloader(coord.pending);
    (coord);
  }, [coord]);

  return (
    coord.data_first && (
      <main className="flex h-full p-8 max-md:p-4  gap-8 max-lg:flex-col overflow-y-scroll">
        <section className="flex-2  flex flex-col gap-6">
          <div className="flex justify-between">
            <div>
              <h1 className="text-6xl max-md:text-4xl flex items-end gap-3">
                <CountUp
                  from={0}
                  to={coord.data_first.current?.us_aqi || 0}
                  separator=","
                  duration={0.5}
                  className="count-up-text"
                />
                <span className="text-2xl">AQI</span>
                <span className="text-sm text-gray-300">
                  {coord.data_first.current_units?.us_aqi}
                </span>
              </h1>

              <div
                className={`
                  ${US_STD(coord.data_first.current?.us_aqi)?.color}
                 flex justify-center mt-4 py-1 px-2 rounded-md`}
              >
                <h1>{US_STD(coord.data_first.current?.us_aqi)?.level}</h1>
              </div>
            </div>

            <div className="flex items-end flex-col">
              <h1 className="text-5xl max-md:text-4xl">
                {coord.data_second.address?.city || coord.data_second.address?.state }
              </h1>
              <h1 className="text-3xl max-md:text-2xl text-gray-400 ">
                {coord.data_second.address?.country}
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div>
                <h1 className="text-3xl max-md:text-2xl">PM 2.5</h1>
                <p className="text-2xl max-md:text-xl flex gap-1 text-gray-400">
                  <CountUp
                    from={0}
                    to={Number(coord.data_first.current?.pm2_5) || 0}
                    separator=","
                    duration={0.5}
                    className="count-up-text"
                  />

                  {coord.data_first.current_units?.pm2_5}
                </p>
              </div>
              <div>
                <h1 className="text-3xl max-md:text-2xl">PM 10</h1>
                <p className="text-2xl max-md:text-xl flex gap-1 text-gray-400">
                  <CountUp
                    from={0}
                    to={Number(coord.data_first.current?.pm10) || 0}
                    separator=","
                    duration={0.5}
                    className="count-up-text"
                  />
                  {coord.data_first.current_units?.pm10}
                </p>
              </div>
              <div>
                <h1 className="text-3xl max-md:text-2xl">Elevation</h1>
                <p className="text-2xl max-md:text-xl text-gray-400">
                  <CountUp
                    from={0}
                    to={Number(coord.data_first?.elevation) || 0}
                    separator=","
                    duration={0.5}
                    className="count-up-text"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className=" h-full">
            <LChart />
          </div>
        </section>

        <section className="flex-1 max-lg:h-screen 0">
          <h1 className="text-3xl hidden max-lg:block my-8">Particles</h1>

          <section className="h-full  max-lg:gap-4 text-white bg-gray-100/9 rounded-lg p-4 flex flex-col justify-between">
            {coord.data_first.current &&
              arr.map((val, ind) => (
                <div
                  key={ind}
                  className="flex items-center  justify-between py-2 px-4 rounded-lg bg-black"
                >
                  <h1 className="text-xl">{val.name}</h1>
                  <h1 className="flex gap-2">
                    {coord.data_first.current[val.key] || 0}
                    <span className="text-gray-500">{coord.data_first.current_units[val.key]}</span>
                  </h1>
                </div>
              ))}
          </section>
        </section>
      </main>
    )
  );
};

export default Home;

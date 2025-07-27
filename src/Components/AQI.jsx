import React, { useEffect } from "react";

const AQI = ({ setloader }) => {
  useEffect(() => {
    setloader(false);
  }, []);

  const aqiFAQs = [
    {
      question: "What does AQI stand for?",
      answer:
        "AQI stands for Air Quality Index. It is a standardized numerical scale that communicates how polluted the air currently is or how polluted it is forecasted to become. The index simplifies complex air quality data into an easy-to-understand value to inform the public about the safety of outdoor air.",
    },
    {
      question: "Why is AQI important?",
      answer:
        "AQI is important because it helps people understand the potential health impacts of air pollution in their area. By knowing the AQI, individuals can take necessary precautions such as limiting outdoor activities or wearing masks to protect themselves, especially vulnerable groups like children, elderly people, and those with respiratory or heart conditions.",
    },
    {
      question: "Which pollutants are included in AQI measurements?",
      answer:
        "The AQI is based on the concentrations of several key air pollutants that are harmful to human health. These include particulate matter (PM2.5 and PM10), ground-level ozone (O₃), carbon monoxide (CO), sulfur dioxide (SO₂), and nitrogen dioxide (NO₂). Each pollutant is monitored because they have varying effects on respiratory and cardiovascular health.",
    },
    {
      question: "What is PM2.5 and why is it important in AQI?",
      answer:
        "PM2.5 refers to fine particulate matter that is 2.5 micrometers or smaller in diameter. These particles are small enough to penetrate deep into the lungs and even enter the bloodstream, causing serious health issues like asthma, heart attacks, and lung disease. Because of its harmful effects, PM2.5 is a critical component in calculating the AQI.",
    },
    {
      question: "How is the AQI value calculated?",
      answer:
        "The AQI value is calculated by converting the measured concentrations of each pollutant into a normalized index value on a scale, usually from 0 to 500. The highest index value among the pollutants determines the overall AQI for a location at a specific time. This approach ensures the AQI reflects the pollutant posing the greatest health risk.",
    },
    
  ];

const aqiFAQ2= [
    {
      question: "What do different AQI ranges mean?",
      answer:
        "AQI values are divided into categories that correspond to different levels of health concern. 0-50 is considered 'Good,' meaning air quality poses little or no risk. 51-100 is 'Moderate,' acceptable but some pollutants may be a concern for sensitive individuals. 101-150 is 'Unhealthy for Sensitive Groups,' where people with health issues should reduce outdoor activities. 151-200 is 'Unhealthy' for everyone, 201-300 is 'Very Unhealthy,' and above 300 is 'Hazardous,' indicating serious health warnings.",
    },
    {
      question: "What health effects can high AQI levels cause?",
      answer:
        "High AQI levels indicate poor air quality which can lead to a range of health problems, such as throat irritation, coughing, difficulty breathing, and worsening of asthma or other chronic lung diseases. Long-term exposure may increase the risk of heart disease, lung cancer, and premature death. Sensitive groups are particularly vulnerable to these effects.",
    },
    {
      question: "Who are considered sensitive groups in AQI reporting?",
      answer:
        "Sensitive groups include children, elderly adults, and people with pre-existing respiratory or cardiovascular conditions such as asthma, chronic obstructive pulmonary disease (COPD), or heart disease. These individuals may experience more severe health effects from air pollution and should take extra precautions when AQI levels are elevated.",
    },
    {
      question: "How often is the AQI updated?",
      answer:
        "AQI is typically updated hourly or every few hours by monitoring agencies depending on the availability of real-time air quality data. Frequent updates allow the public to stay informed about current conditions and adjust their activities accordingly.",
    },
    {
      question: "Can AQI values vary within a city or region?",
      answer:
        "Yes, AQI values can vary significantly within a city or region due to factors such as traffic density, industrial activity, weather conditions, and geography. Urban areas with heavy traffic or industrial pollution often have higher AQI values compared to rural or suburban areas.",
    },
    {
      question:
        "What can individuals do to reduce exposure during poor air quality days?",
      answer:
        "On days with high AQI, individuals can reduce exposure by staying indoors, using air purifiers, avoiding strenuous outdoor activities, closing windows, and wearing masks designed to filter particulate matter. Following local air quality advisories and limiting outdoor exercise can help protect health.",
    },
    {
      question: "How do weather conditions affect AQI?",
      answer:
        "Weather plays a major role in air quality. For example, temperature inversions can trap pollutants near the ground, increasing AQI values. Wind can disperse pollutants, reducing concentrations. Rain can help clear pollutants from the air, temporarily lowering AQI. Understanding these effects helps explain fluctuations in air quality.",
    },
    {
      question: "Is AQI the same worldwide?",
      answer:
        "While the concept of AQI is used globally, different countries may use slightly different scales, pollutants, or calculation methods based on local regulations and priorities. However, all AQI systems aim to communicate air pollution levels and health risks in a clear and understandable way.",
    },
    {
      question:
        "What are some common sources of air pollution that affect AQI?",
      answer:
        "Common sources include vehicle emissions, industrial processes, power plants, construction activities, burning of fossil fuels, wildfires, and even natural dust storms. These sources release various pollutants that contribute to higher AQI levels.",
    },
    {
      question: "How can governments use AQI data?",
      answer:
        "Governments use AQI data to issue health advisories, regulate emissions, plan urban development, and create policies to improve air quality. Monitoring AQI helps track pollution trends, enforce environmental laws, and protect public health.",
    },
    {
      question: "Where can I find real-time AQI information?",
      answer:
        "Real-time AQI information can be found on government environmental websites, specialized apps like AirVisual or BreezoMeter, and local news sources. Many cities and countries provide public dashboards with current air quality conditions and forecasts.",
    },
]

   const aqiRanges = [
    { range: "0 - 50", level: "Good", color: "#00e400" },       // Green
    { range: "51 - 100", level: "Moderate", color: "#ffff00" }, // Yellow
    { range: "101 - 150", level: "Unhealthy for Sensitive Groups", color: "#ff7e00" }, // Orange
    { range: "151 - 200", level: "Unhealthy", color: "#ff0000" }, // Red
    { range: "201 - 300", level: "Very Unhealthy", color: "#8f3f97" }, // Purple
    { range: "301 - 500", level: "Hazardous", color: "#7e0023" } // Maroon
  ];

  return (
    <main className="text-white p-8 overflow-y-scroll flex flex-col ">
      {aqiFAQs.map((el, ind) => (
        <div key={ind} className="py-4 flex flex-col gap-4">
          <h1 className="text-3xl">{el.question}</h1>
          <p className="text-xl">{el.answer}</p>
          <hr />
        </div>
      ))}
<table>
    <tbody>
        {aqiRanges.map(({ range, level, color }) => (
  <tr key={range} className="border border-white flex">
    <td className="border flex-1 border-white px-4 py-2 text-center">{range}</td>
    <td className="border flex-1 border-white px-4 py-2 text-center">{level}</td>
    <td className="border flex-1 border-white px-4 py-2 text-center">
      <div
        className="mx-auto border border-black"
        style={{ width: "30px", height: "20px", backgroundColor: color }}
      />
    </td>
  </tr>
))}
</tbody>
</table>

      {aqiFAQ2.map((el, ind) => (
        <div key={ind} className="py-4 flex flex-col gap-4">
          <h1 className="text-3xl">{el.question}</h1>
          <p className="text-xl">{el.answer}</p>
          <hr />
        </div>
      ))}
      
    </main>
  );
};

export default AQI;

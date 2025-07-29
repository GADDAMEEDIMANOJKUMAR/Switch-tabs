import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import LoadingIcons from 'react-loading-icons'

const App = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track selected tab index
  const url = "https://www.course-api.com/react-tabs-project";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data.length === 0) {
    return <div className="load">Loading...</div>;
  }

  const { company, dates, duties, title } = data[currentIndex];

  return (
    <div className="container">
      <h1 className="head">Switch Tabs</h1>
      <div className="main">
        <div className="buttons">
          {data.map((item, index) => (
            <button
              key={index}
              className={`btn ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            >
              {item.company}
            </button>
            
          ))}
        </div>

        <div className="tab-content">
          <div className="content">
            <h1 className="heading">{title}</h1>
            <span className="add">{company}</span>
            <p className="years">{dates}</p>
            {duties.map((duty, index) => (
              <div className="duty">
              <span> <i class="bi bi-heart-arrow icon"></i></span>
              <p key={index} className="para">
                {duty}
              </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

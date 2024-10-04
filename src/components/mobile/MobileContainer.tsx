import React, { useState } from "react";
import "./mobileContainer.scss";
import Card from "../Card/Card";
import { FaX } from "react-icons/fa6";
import {
  FaBars,
  FaBusinessTime,
  FaFilm,
  FaFootballBall,
  FaHeartbeat,
  FaLaptopCode,
  FaMicroscope,
  FaHome,
} from "react-icons/fa";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
] as const;
const categoryIcons = {
  general: <FaHome size={60} />,
  business: <FaBusinessTime size={60} />,
  entertainment: <FaFilm size={60} />,
  health: <FaHeartbeat size={60} />,
  science: <FaMicroscope size={60} />,
  sports: <FaFootballBall size={60} />,
  technology: <FaLaptopCode size={60} />,
};

interface Article {
  author?: string;
  content?: string;
  description?: string;
  publishedAt?: string;
  source?: {
    id?: null;
    name?: string;
  };
  title?: string;
  url?: string;
  urlToImage?: string;
  index?: number;
}

interface MobileContainerProps {
  type: string;
  latestNews: Article[];
  articlesByCategory: {
    [key: string]: Article[];
  };
}

const MobileContainer = ({
  articlesByCategory,
  latestNews,
  type,
}: MobileContainerProps) => {
  const [typeCat, setTypeCat] = React.useState<string>(type);
  console.log(latestNews);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="mobileContainer">
      <div className="open">
        <h3>My news</h3>
        <div onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <FaX /> : <FaBars />}
        </div>
      </div>
      <div className="input-container">
        <input type="text" name="" id="" />
        {!openMenu && (
          <div className="mobile-nav-btn">
            {" "}
            <button
              className="catBtn1"
              onClick={() => {
                setTypeCat("general");
              }}
              style={{
                background: typeCat === "general" ? "#BB1E1E1A" : "none",
              }}
            >
              featured
            </button>
            <button
              onClick={() => {
                setTypeCat("latest");
              }}
              className="catBtn1"
              style={{
                background: typeCat === "latest" ? "#BB1E1E1A" : "none",
              }}
            >
              latest
            </button>
          </div>
        )}
      </div>

      {openMenu && (
        <div className="openMenu">
          {categories.map((item, index) => (
            <button key={index} className="btnMenu" onClick={() => {}}>
              {categoryIcons[item]}
            </button>
          ))}
        </div>
      )}

      {typeCat === "general" ? (
        Object.keys(articlesByCategory)?.map((category) =>
          articlesByCategory[category]?.map((item, index) => (
            <Card
              key={index}
              author={item.author}
              content={item.content}
              title={category}
              description={item.description}
              publishedAt={item.publishedAt?.toString()}
              urlToImage={item.urlToImage}
              source={item.source}
              index={index}
            />
          ))
        )
      ) : (
        <>
          <div style={{ display: "flex", columnGap: "3px" }}>
            <img src="oval.svg" />
            <h4>Latest news</h4>
          </div>
          {latestNews?.map((d, index) => (
            <div className="news-list" key={index}>
              {" "}
              <div className="news-item" key={index}>
                <div className="time">
                  {" "}
                  {new Date(d.publishedAt!).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </div>
                <div className="title">{d.title}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MobileContainer;

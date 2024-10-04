import React, { useRef, useState } from "react";
import Card from "./components/Card/Card";
import { getNews, getNewsByCategory } from "./services/newsService";
import { useNavigate } from "react-router";

import {
  FaBusinessTime,
  FaFilm,
  FaFootballBall,
  FaHeartbeat,
  FaLaptopCode,
  FaMicroscope,
} from "react-icons/fa";
import { FcHome } from "react-icons/fc";

import MobileContainer from "./components/mobile/MobileContainer";
import "./App.scss";

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
  general: <FcHome size={30} />,
  business: <FaBusinessTime size={30} />,
  entertainment: <FaFilm size={30} />,
  health: <FaHeartbeat size={30} />,
  science: <FaMicroscope size={30} />,
  sports: <FaFootballBall size={30} />,
  technology: <FaLaptopCode size={30} />,
};

const Home = () => {
  const [category /* setCategory */] = useState<string>("general");
  const [articlesByCategory, setArticlesByCategory] = useState<{
    [key: string]: Article[];
  }>({});

  const navigate = useNavigate();

  const fetchArticles = async () => {
    const fetchedArticles: { [key: string]: Article[] } = {};
    for (const category of categories) {
      const articles = await getNewsByCategory(category, searchQuery);

      fetchedArticles[category] = articles.sort((a, b) => {
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      });
    }
    setArticlesByCategory(fetchedArticles);
  };

  const [latestNews, setLatestNews] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const widgetRef = useRef<HTMLDivElement>(null); // Ref for widget element
  const fetchLatestNews = async (pageNum: number, pageSize: number) => {
    setIsLoading(true);
    const news = await getNews(category, pageNum, pageSize);
    setLatestNews((prevItems) => [...prevItems, ...news]);

    setIsLoading(false);
  };
  const handleScroll = () => {
    if (widgetRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = widgetRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };
  React.useEffect(() => {
    fetchLatestNews(page, pageSize);
  }, [page]);

  React.useEffect(() => {
    const widgetElement = widgetRef.current;
    if (widgetElement) {
      widgetElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (widgetElement) {
        widgetElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  function getFavorites(): Article[] {
    const storedFavorites = localStorage.getItem("favorites");
    console.log(storedFavorites);
    const favorites: Article[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];
    console.log(favorites);
    return favorites;
  }
  React.useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles();
  };

  return (
    <>
      <div style={{ width: "100%", display: "inline-flex" }}>
        <MobileContainer
          type={category}
          latestNews={latestNews}
          articlesByCategory={articlesByCategory}
        />
      </div>
      <div className="desktop">
        <div className="menu">
          <div className="searchMenu">
            <h2>my news</h2>
          </div>

          <form className="input-container-desktop" onSubmit={handleSubmit}>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name=""
              id=""
            />
            <div>
              <button
                style={{ background: "#BB1E1E" }}
                className="input-btn"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div style={{ display: "flex" }}>
          <div className="categories">
            {categories.map((item, index) => (
              <button
                className="catBtn"
                key={index}
                style={{
                  background: category === item ? "red" : "none",
                }}
                onClick={() => {
                  navigate(item);
                }}
              >
                {categoryIcons[item]}
                <span style={{ marginLeft: "10px" }}>{item}</span>
              </button>
            ))}
            {getFavorites().map((item, index) => (
              <button key={item.author}>
                {`${index + 1}.` + item.source?.name}
              </button>
            ))}
          </div>

          <div className="container">
            <div className="widget" ref={widgetRef}>
              {" "}
              <div className="news">
                <img src="oval.svg" />
                <h4>Latest news</h4>
              </div>
              {latestNews.map((d, index) => (
                <div key={index} className="latest">
                  <span className="time">
                    {new Date(d.publishedAt!).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>

                  <span className="title">{d.title}</span>
                </div>
              ))}
              {isLoading && <p>Loading more news...</p>}
            </div>
            {Object.keys(articlesByCategory).map((category) =>
              articlesByCategory[category].map((item, index) => (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

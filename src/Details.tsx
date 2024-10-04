import React, { useState } from "react";
import { useParams } from "react-router";
import { Article, getNewsByCategory } from "./services/newsService";
import Card from "./components/Card/Card";
import "./App.scss";

const Details = () => {
  const params = useParams();
  const [articlesByCategory, setArticlesByCategory] = useState<Article[]>();

  React.useEffect(() => {
    const fetchLatestNews = async () => {
      const news = await getNewsByCategory(params.articleId!);
      setArticlesByCategory(news);
    };
    fetchLatestNews();
  }, [params.articleId]);
  return (
    <div className="details">
      <div>Details {params.articleId}</div>
      <div className="grids">
        {articlesByCategory?.length
          ? articlesByCategory.map((d, index) => (
              <Card
                key={index}
                description={d.description}
                publishedAt={d.publishedAt?.toString()}
                urlToImage={d.urlToImage}
                index={index}
              />
            ))
          : []}
      </div>
    </div>
  );
};

export default Details;

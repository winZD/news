import "./card.scss";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

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

const Card = (props: Article) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const favorites: Article[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];

    const isAlreadyFavorite = favorites.some(
      (article) => article.title === props.title
    );

    setIsFavorite(isAlreadyFavorite);
  }, [props.title]);

  const handleAddToFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    const favorites: Article[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];

    const isAlreadyFavorite = favorites.some(
      (article) => article.index === props.index
    );

    if (!isAlreadyFavorite) {
      favorites.push({
        author: props.author,
        content: props.content,
        description: props.description,
        publishedAt: props.publishedAt,
        source: props.source,
        title: props.title,
        url: props.url,
        urlToImage: props.urlToImage,
      });

      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    } else {
      console.log();
      console.log("Article already exists in favorites");
    }
  };

  return (
    <div className="card">
      <div>
        <img
          src={props?.urlToImage}
          alt="Avatar"
          style={{ width: "100%", height: "50%" }}
        />
      </div>
      <div className="">
        <h4>
          <b>{props.title?.toUpperCase()}</b>
        </h4>
        <p>{props.author}</p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToFavorites();
          }}
        >
          <FaStar color={isFavorite ? "yellow" : "grey"} />
        </button>
      </div>
    </div>
  );
};

export default Card;

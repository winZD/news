const API_KEY = "8a0983364c474c089f817f94636d2c7d";
const BASE_URL = "https://newsapi.org/v2";

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

export const getNewsByCategory = async (
  category: string,
  searchQuery?: string
): Promise<Article[]> => {
  console.log(category);
  const url = `${BASE_URL}/top-headlines?${
    searchQuery ? `q=${searchQuery}&` : ""
  }category=${category}&pageSize=${100}&apiKey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching news for category ${category}`);
  }

  const data = await response.json();
  return data.articles;
};

export const searchNews = async (query: string): Promise<Article[]> => {
  const url = `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error searching for news with query ${query}`);
  }

  const data = await response.json();
  return data.articles;
};

export const getNews = async (
  category: string,
  page: number,
  pageSize: number
): Promise<Article[]> => {
  const url = `${BASE_URL}/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching news for category ${category}`);
  }

  const data = await response.json();
  return data.articles;
};

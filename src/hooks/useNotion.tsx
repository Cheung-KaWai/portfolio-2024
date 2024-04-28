import { getArticles } from "@services/notion";
import { useEffect, useState } from "react";

export const useNotion = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      const listArticles = await getArticles();
      setArticles(listArticles);
    })();
  }, []);

  return { articles };
};

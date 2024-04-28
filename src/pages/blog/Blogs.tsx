import { Article } from "@customTypes/notion";
import { useNotion } from "@hooks/useNotion";

export const Blogs = () => {
  const { articles } = useNotion();

  return (
    <>
      {articles?.map((article: Article) => (
        <p key={article.id}>{article.title}</p>
      ))}
    </>
  );
};

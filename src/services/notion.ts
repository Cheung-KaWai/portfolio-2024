export const getArticles = async () => {
  const data = await fetch("https://notion-api-omega.vercel.app/articles");
  return data.json();
};

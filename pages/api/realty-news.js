import { getRealtyNews } from "@/lib/fetchRealtyNews";

export default async function handler(req, res) {
  const news = await getRealtyNews();
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24hrs
  res.status(200).json(news);
}

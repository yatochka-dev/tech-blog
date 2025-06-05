import ArticleCard from "./ArticleCard";

const articles = [
  {
    id: 2,
    title: "Can NIH-funded research on racism and health survive Trump's cuts?",
    summary:
      "The US administration has cancelled 'DEI grants' without defining DEI, leaving health-equity researchers in the dark.",
    image: "https://placehold.co/300x200",
    alt: "Researchers in a laboratory",
    date: "News • 16 May 2025",
    link: "/article/2",
  },
  {
    id: 3,
    title: "US brain drain: Nature's guide to the initiatives drawing scientists abroad",
    summary:
      "In response to US turmoil, premier establishments such as the European Research Council have sweetened incentives to attract talent.",
    image: "https://placehold.co/300x200",
    alt: "European Research Council building",
    date: "News • 16 May 2025",
    link: "/article/3",
  },
];

export default function ArticlesSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}

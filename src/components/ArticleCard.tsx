import Link from "next/link";
import Image from "next/image";

type ArticleCardProps = {
  title: string;
  summary: string;
  image: string;
  alt: string;
  date: string;
  link: string;
};

export default function ArticleCard({ title, summary, image, alt, date, link }: ArticleCardProps) {
  return (
    <div className="flex flex-col space-y-3">
      <div className="relative h-48 mb-2">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <Link href={link} className="group">
        <h3 className="text-lg font-bold leading-tight group-hover:text-blue-700">{title}</h3>
      </Link>
      <p className="text-sm text-gray-700">{summary}</p>
      <div className="mt-auto pt-2">
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
}

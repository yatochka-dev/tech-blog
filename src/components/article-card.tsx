import Link from "next/link";
import Image from "next/image";
import { cn } from "~/lib/utils";

type ArticleCardProps = {
  title: string;
  summary: string;
  image: string;
  alt: string;
  date: string;
  link: string;
  className?: string;
};

export default function ArticleCard({
  title,
  summary,
  image,
  alt,
  date,
  link,
  className,
}: ArticleCardProps) {
  return (
    <div className={cn("flex flex-col space-y-3", className)}>
      <div className="relative mb-2 h-36">
        <Image
          src={image}
          alt={alt}
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <Link href={link} className="group">
        <h3 className="text-lg leading-tight font-bold group-hover:text-blue-700">
          {title}
        </h3>
      </Link>
      <p className="text-sm text-gray-700">{summary}</p>
      <div className="mt-auto pt-2">
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
}

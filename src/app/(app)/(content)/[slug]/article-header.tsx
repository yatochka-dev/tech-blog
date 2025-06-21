import Image from "next/image";

interface ArticleHeaderProps {
  title: string;
  description: string;
  type: string;
  coverImage: string;
  coverAlt: string;
}

export default function ArticleHeader({
  title,
  description,
  type,
  coverImage,
  coverAlt,
}: ArticleHeaderProps) {
  return (
    <header className="relative">
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={coverAlt}
          fill
          className="object-cover brightness-75"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="relative container mx-auto -mt-48 px-4 pb-8">
        <div className="max-w-3xl text-white">
          <span className="bg-primary text-primary-foreground mb-4 inline-block rounded-md px-3 py-1 text-sm font-medium">
            {type}
          </span>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-gray-100 md:text-xl">{description}</p>
        </div>
      </div>
    </header>
  );
}

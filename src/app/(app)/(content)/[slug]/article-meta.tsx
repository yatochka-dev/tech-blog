import { displayDate } from "~/lib/date";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

interface Author {
  name: string;
  avatar: string;
  title?: string;
}

interface ArticleMetaProps {
  author: Author;
  publishDate: string;
  updateDate?: string;
}

export default function ArticleMeta({
  author,
  publishDate,
  updateDate,
}: ArticleMetaProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Article Information</h2>

      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={author.avatar} />
        </Avatar>
        <div>
          <p className="font-medium">{author.name}</p>
          {author.title && (
            <p className="text-sm text-gray-600">{author.title}</p>
          )}
        </div>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p>Published: {displayDate(new Date(publishDate))}</p>
        {updateDate && <p>Updated: {displayDate(new Date(updateDate))}</p>}
      </div>
    </div>
  );
}

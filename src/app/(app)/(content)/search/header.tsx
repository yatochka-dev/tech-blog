import React from "react";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useQueryState } from "nuqs";

const Header = () => {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Search Articles</h1>
        <p className="text-muted-foreground">
          Find research articles, news, and insights from the world of science
        </p>
      </div>

      <div className="flex max-w-2xl gap-4">
        <div className="relative flex-1">
          <Search className="text-muted-foreground/80 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or content..."
            className="pl-10"
          />
        </div>
        <Button type="submit" className="px-8">
          Search
        </Button>
      </div>

      {/*{query && (*/}
      {/*  <div className="text-sm text-gray-600">*/}
      {/*    {totalResults} {totalResults === 1 ? "result" : "results"} found for "*/}
      {/*    {query}"*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default Header;

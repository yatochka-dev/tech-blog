import React from "react";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useQueryState, parseAsInteger } from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const useArticlesLimit = () => {
  return useQueryState<number>("limit", {
    defaultValue: 25,
    parse: parseAsInteger.parse,
    serialize: parseAsInteger.serialize,
  });
};

const SearchHeader = () => {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
  const [limit, setLimit] = useArticlesLimit();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Search Articles</h1>
        <p className="text-muted-foreground">
          Find research articles, news, and insights from the world of science
        </p>
      </div>
      <div className={"flex w-full flex-col gap-2 md:flex-row"}>
        <div className="flex w-full flex-col gap-4 md:w-2xl md:flex-row">
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
        <div className={"flex-1"} />
        <div className={"flex items-center gap-4"}>
          <p className={"inline text-lg md:hidden"}>Articles per page:</p>
          <Select
            defaultValue={`${limit}`}
            value={`${limit}`}
            onValueChange={async (v) => {
              const value = parseAsInteger.parse(v);

              console.log(value);
              if (value) {
                await setLimit(value);
                return;
              }
              await setLimit(10);
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Articles" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Articles per page</SelectLabel>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;

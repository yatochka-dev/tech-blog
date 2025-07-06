import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function SiteHeader() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center">
          <h1 className="font-serif text-3xl font-bold md:text-4xl">nature</h1>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/journals" className="text-sm hover:underline">
            View all journals
          </Link>
          <div className="relative">
            <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            <Input
              type="search"
              placeholder="Search"
              className="h-9 w-40 pl-8 md:w-60"
            />
          </div>
        </div>
        <Button size="sm" variant="outline" className="md:hidden">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

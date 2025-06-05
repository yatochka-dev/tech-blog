import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import {Button} from "~/components/ui/button";

export default function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold">nature</h1>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/journals" className="text-sm hover:underline">
            View all journals
          </Link>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search" className="pl-8 h-9 w-40 md:w-60" />
          </div>
        </div>
        <Button size="sm" variant="outline" className="md:hidden">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

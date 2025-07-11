"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type getAppConfig } from "~/data-access/appconf";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { usePathname, useRouter } from "next/navigation";

export default function Header({
  appConfig,
}: {
  appConfig: Awaited<ReturnType<typeof getAppConfig>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center">
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            {appConfig.appName}
          </h1>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <div className="relative">
            <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            <Input
              type="search"
              disabled={isSearchPage}
              placeholder="Search"
              className="h-9 w-40 pl-8 md:w-60"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  router.push(
                    "/search?q=" + encodeURIComponent(e.currentTarget.value),
                  );
                }
              }}
            />
          </div>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Button size="sm" variant="outline">
            <Search className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

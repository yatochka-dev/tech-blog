"use client";

import { useState } from "react";
import { Calendar, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { DatePicker } from "~/app/(app)/(content)/search/date";
import { api } from "~/trpc/react";

export default function SearchFiltersComponent() {
  const [showAllTags, setShowAllTags] = useState(false);
  const [tagSearch, setTagSearch] = useState("");

  const { data: tags } = api.posts.getTags.useQuery({
    search: tagSearch,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center text-lg font-semibold">
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </h2>
      </div>

      {/* Tags Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search tags..."
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
            className="h-8"
          />

          <div className="max-h-64 space-y-2 overflow-y-auto">
            {tags?.map((t) => (
              <div key={t.id} className="flex items-center space-x-2">
                <Checkbox id={`tag-${t.id}`} />
                <Label
                  htmlFor={`tag-${t.id}`}
                  className="flex-1 cursor-pointer text-sm"
                >
                  {t.label}
                </Label>
              </div>
            ))}
          </div>

          {/*<Button*/}
          {/*  variant="ghost"*/}
          {/*  size="sm"*/}
          {/*  onClick={() => setShowAllTags(!showAllTags)}*/}
          {/*  className="w-full"*/}
          {/*>*/}
          {/*  {showAllTags ? (*/}
          {/*    <>*/}
          {/*      <ChevronUp className="mr-1 h-4 w-4" />*/}
          {/*      Show Less*/}
          {/*    </>*/}
          {/*  ) : (*/}
          {/*    <>*/}
          {/*      <ChevronDown className="mr-1 h-4 w-4" />*/}
          {/*      Show More*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</Button>*/}
        </CardContent>
      </Card>

      {/* Date Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            Publication Date
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label
              htmlFor="date-from"
              className="text-muted-foreground text-xs"
            >
              From
            </Label>
            <DatePicker />
          </div>
          <div>
            <Label htmlFor="date-to" className="text-muted-foreground text-xs">
              To
            </Label>
            <DatePicker />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

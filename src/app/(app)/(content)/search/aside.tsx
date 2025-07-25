"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { api } from "~/trpc/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { useQueryState } from "nuqs";
import { z } from "zod";
import { TextShimmer } from "~/components/ui/text-shimmer";
import { cn } from "~/lib/utils";
import { useIsMobile } from "~/hooks/use-mobile";

export const useTags = () => {
  return useQueryState<number[]>("tags", {
    serialize: (value) => {
      return JSON.stringify(value);
    },
    defaultValue: [],
    parse: (value) => {
      console.log(value);
      const schema = z.number().positive().array();
      const { data, success } = schema.safeParse(JSON.parse(value));
      if (!success) return [];
      return data;
    },
  });
};

export default function SearchFiltersComponent() {
  const [tagSearch, setTagSearch] = useState("");
  const [filteredTags, setFilteredTags] = useTags();

  const { data: tags, ...query } = api.posts.getTags.useQuery({
    search: tagSearch,
  });
  const isLoadingTags = useMemo(() => {
    return tags === undefined || query.isLoading;
  }, [tags, query.isLoading]);

  const isMobile = useIsMobile();

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={isMobile ? undefined : "item-1"}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className={"flex cursor-pointer items-center"}>
          <div className="flex items-center justify-between">
            <h2 className="flex items-center text-lg font-semibold">
              <Filter className="mr-2 h-5 w-5" />
              Filters
            </h2>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div className="space-y-6">
            {/* Tags Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-sm">
                  Tags{" "}
                  <div className={cn(filteredTags.length === 0 && "opacity-0")}>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      className={"cursor-pointer py-0 leading-none"}
                      onClick={async () => {
                        await setFilteredTags([]);
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-96 space-y-4">
                <Input
                  placeholder="Search tags..."
                  value={tagSearch}
                  onChange={(e) => setTagSearch(e.target.value)}
                  className="h-8"
                />

                <div className="max-h-84 space-y-2 overflow-y-auto">
                  {!isLoadingTags ? (
                    tags?.map((t) => (
                      <div key={t.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${t.id}`}
                          checked={filteredTags.includes(t.id)}
                          onCheckedChange={async (checked) => {
                            if (checked) {
                              await setFilteredTags((prev) => [...prev, t.id]);
                            } else {
                              await setFilteredTags((prev) =>
                                prev.filter((id) => id !== t.id),
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={`tag-${t.id}`}
                          className="flex-1 cursor-pointer text-sm"
                        >
                          {t.label}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className={"flex h-36 items-center justify-center"}>
                      <TextShimmer duration={1}>
                        Searching for tags...
                      </TextShimmer>
                    </div>
                  )}
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
            {/*<Card>*/}
            {/*  <CardHeader>*/}
            {/*    <CardTitle className="flex items-center text-sm">*/}
            {/*      <Calendar className="mr-2 h-4 w-4" />*/}
            {/*      Publication Date*/}
            {/*    </CardTitle>*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent className="space-y-4">*/}
            {/*    <div>*/}
            {/*      <Label*/}
            {/*        htmlFor="date-from"*/}
            {/*        className="text-muted-foreground text-xs"*/}
            {/*      >*/}
            {/*        Date Range*/}
            {/*      </Label>*/}
            {/*      <DatePicker />*/}
            {/*    </div>*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

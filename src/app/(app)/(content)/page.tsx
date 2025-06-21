import Link from "next/link";
import Image from "next/image";
import { getAppConfig } from "~/data-access/appconf";
import PostCard from "~/components/PostCard";
import type { Media } from "@payload-types";

export const revalidate = 60;

export default async function Home() {
  const appConfig = await getAppConfig();
  const featuredArticle = appConfig.landingPageArticles.heroPost;
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="border-b">
          <div className="container mx-auto px-4">
            {/*FEATURED ARTICLE*/}
            {!!featuredArticle && (
              <div className="grid gap-6 py-8 md:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <Link
                    href={`/${appConfig.landingPageArticles.heroPost.slug}`}
                    className="group"
                  >
                    <h2 className="text-2xl leading-tight font-bold group-hover:text-blue-700 md:text-3xl">
                      {appConfig.landingPageArticles.heroPost.title}
                    </h2>
                  </Link>
                  <p className="text-gray-700">
                    {appConfig.landingPageArticles.heroPost.description}
                  </p>
                </div>
                <div className="relative h-64 md:h-full">
                  <Image
                    // src={appConfig.landingPageArticles.heroPost.cover.url}
                    // alt={appConfig.landingPageArticles.heroPost.cover.alt}
                    src={
                      (appConfig.landingPageArticles.heroPost.cover as Media)
                        .url ?? ""
                    }
                    alt={
                      (appConfig.landingPageArticles.heroPost.cover as Media)
                        .alt
                    }
                    fill
                    className="rounded-md object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {(appConfig.landingPageArticles.latestArticles ?? []).map((p) => (
                <PostCard key={p.id} post={p} />
              ))}

              {/*<div className="flex flex-col space-y-3">*/}
              {/*  <div className="relative mb-2 h-48">*/}
              {/*    <Image*/}
              {/*      src="https://placehold.co/300x200"*/}
              {/*      alt="European Research Council building"*/}
              {/*      fill*/}
              {/*      className="rounded-md object-cover"*/}
              {/*      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*  <Link href="/article/3" className="group">*/}
              {/*    <h3 className="text-lg leading-tight font-bold group-hover:text-blue-700">*/}
              {/*      US brain drain: Nature&apos;s guide to the initiatives*/}
              {/*      drawing scientists abroad*/}
              {/*    </h3>*/}
              {/*  </Link>*/}
              {/*  <p className="text-sm text-gray-700">*/}
              {/*    In response to US turmoil, premier establishments such as the*/}
              {/*    European Research Council have sweetened incentives to attract*/}
              {/*    talent.*/}
              {/*  </p>*/}
              {/*  <div className="mt-auto pt-2">*/}
              {/*    <p className="text-xs text-gray-500">News • 16 May 2025</p>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
        </section>

        {/* Current Issue */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6 md:col-span-2">
                <h2 className="text-2xl font-bold">Latest Research</h2>
                <div className="grid gap-6 sm:grid-cols-3">
                  {(appConfig.landingPageArticles.researchArticles ?? []).map(
                    (p) => {
                      // no older than a week
                      const isNew =
                        new Date(p.createdAt) >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

                      return (
                        <PostCard
                          key={p.id}
                          post={p}
                          isResearch
                          isNew={isNew}
                        />
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

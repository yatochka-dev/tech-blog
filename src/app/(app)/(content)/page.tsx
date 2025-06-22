import Link from "next/link";
import Image from "next/image";
import { getAppConfig } from "~/data-access/appconf";
import PostCard from "~/components/PostCard";
import type { Media } from "@payload-types";

function get() {
  return null;
}
export const dynamic = "force-dynamic";

export default async function Home() {
  // const appConfig = await getAppConfig();
  const appConfig = get();
  // DEBUGGING: Log the config received in the build environment
  console.log(
    "App config received during build:",
    JSON.stringify(appConfig, null, 2),
  );

  // A. TOP-LEVEL GUARD: If config fails to load, show an error or empty state.
  if (!appConfig) {
    // Or return a loading skeleton, or just null
    return (
      <main className="flex-1 p-4">
        <p>Could not load page configuration. Please try again later.</p>
      </main>
    );
  }
  //
  // if (appConfig.homePageActive !== true) return null;
  //
  // // B. SAFELY access nested data
  // const heroPost = appConfig?.landingPageArticles?.heroPost;
  // const latestArticles = appConfig?.landingPageArticles?.latestArticles ?? [];
  // const researchArticles =
  //   appConfig?.landingPageArticles?.researchArticles ?? [];
  //
  // return (
  //   <div className="flex min-h-screen flex-col">
  //     <div className="flex-1">
  //       <section className="border-b">
  //         <div className="container mx-auto px-4">
  //           {/* C. Check for the specific data you need before rendering */}
  //           {!!heroPost && (
  //             <div className="grid gap-6 py-8 md:grid-cols-2">
  //               <div className="flex flex-col justify-center space-y-4">
  //                 <Link href={`/${heroPost.slug}`} className="group">
  //                   <h2 className="text-2xl leading-tight font-bold group-hover:text-blue-700 md:text-3xl">
  //                     {heroPost.title}
  //                   </h2>
  //                 </Link>
  //                 <p className="text-gray-700">{heroPost.description}</p>
  //               </div>
  //               {/* D. SAFE access to the image URL */}
  //               {heroPost.cover && (
  //                 <div className="relative h-64 md:h-full">
  //                   <Image
  //                     src={(heroPost.cover as Media)?.url ?? ""}
  //                     alt={
  //                       (heroPost.cover as Media)?.alt ??
  //                       "Featured article cover"
  //                     }
  //                     fill
  //                     className="rounded-md object-cover"
  //                     sizes="(max-width: 768px) 100vw, 50vw"
  //                     priority
  //                   />
  //                 </div>
  //               )}
  //             </div>
  //           )}
  //         </div>
  //       </section>
  //
  //       <section className="py-8">
  //         <div className="container mx-auto px-4">
  //           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  //             {latestArticles.map((p) => (
  //               <PostCard key={p.id} post={p} />
  //             ))}
  //           </div>
  //         </div>
  //       </section>
  //
  //       <section className="py-8">
  //         <div className="container mx-auto px-4">
  //           <div className="grid gap-8 md:grid-cols-2">
  //             <div className="space-y-6 md:col-span-2">
  //               <h2 className="text-2xl font-bold">Latest Research</h2>
  //               <div className="grid gap-6 sm:grid-cols-3">
  //                 {researchArticles.map((p) => {
  //                   const isNew =
  //                     new Date(p.createdAt) >
  //                     new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  //                   return (
  //                     <PostCard key={p.id} post={p} isResearch isNew={isNew} />
  //                   );
  //                 })}
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //     </div>
  //   </div>
  // );
}

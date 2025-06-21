// "use client";
// import { Button } from "~/components/ui/button";
// import { Textarea } from "~/components/ui/textarea";
// import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
// import { Card, CardContent } from "~/components/ui/card";
// import { MessageCircle, Reply, Send, ChevronDown } from "lucide-react";
// import type { CommentWithComments } from "~/server/api/routers/posts";
// import { api } from "~/trpc/react";
// import { useAppForm } from "~/components/forms";
// import { z } from "zod";
// import TextareaField from "~/components/forms/fields/textarea";
// import type { User } from "payload";
//
// interface ArticleCommentsProps {
//   id: number;
// }
//
// interface CommentComponentProps {
//   comment: CommentWithComments;
//   depth: number;
// }
//
// const CommentComponent = ({ comment, depth = 0 }: CommentComponentProps) => {
//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };
//
//   const maxDepth = 100;
//   const isMaxDepth = depth >= maxDepth;
//
//   const author = comment.author as unknown as User;
//
//   return (
//     <div
//       className={`${depth > 0 ? "ml-6 md:ml-8" : ""} ${depth > 0 ? "border-border border-l-2 pl-4" : ""}`}
//     >
//       <Card className="mb-4">
//         <CardContent className="p-4">
//           {/* Comment Header */}
//           <div className="mb-3 flex items-start space-x-3">
//             <Avatar className="h-8 w-8">
//               <AvatarImage
//                 src={
//                   (author.image as unknown as Media).url ?? "/placeholder.svg"
//                 }
//                 alt={author.name}
//               />
//               <AvatarFallback className="text-xs">
//                 {getInitials(author.name)}
//               </AvatarFallback>
//             </Avatar>
//             <div className="min-w-0 flex-1">
//               <div className="mb-1 flex items-center space-x-2">
//                 <h4 className="truncate text-sm font-medium">{author.name}</h4>
//                 <span className="text-muted-foreground text-xs">
//                   {comment.createdAt}
//                 </span>
//               </div>
//               <p className="text-sm leading-relaxed">{comment.content}</p>
//             </div>
//           </div>
//
//           {/* Comment Actions */}
//           <div className="mt-3 flex items-center space-x-4">
//             {!isMaxDepth && (
//               <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
//                 <Reply className="mr-1 h-3 w-3" />
//                 Reply
//               </Button>
//             )}
//
//             {comment.subcomments && comment.subcomments.length > 0 && (
//               <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
//                 <ChevronDown className="mr-1 h-3 w-3" />
//                 Show {comment.subcomments.length}{" "}
//                 {comment.subcomments.length === 1 ? "reply" : "replies"}
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//
//       {/* Nested Replies */}
//       {comment.subcomments && comment.subcomments.length > 0 && (
//         <div className="space-y-2">
//           {comment.subcomments.map((reply) => (
//             <CommentComponent
//               key={reply.id}
//               comment={reply}
//               depth={depth + 1}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
//
// const NewCommentForm = () => {
//   const schema = z.object({
//     content: z.string().min(1).max(1024),
//   });
//
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-expect-error
//   const form = useAppForm<z.infer<typeof schema>>({
//     validators: {
//       onChange: schema,
//     },
//     onSubmit: async ({ value }) => {},
//   });
//
//   return (
//     <Card className="mb-6">
//       <CardContent className="p-4">
//         <h3 className="mb-4 flex items-center text-lg font-medium">
//           <MessageCircle className="mr-2 h-5 w-5" />
//           Leave a Comment
//         </h3>
//         <form className="space-y-4">
//           {/*<Textarea*/}
//           {/*  placeholder="Share your thoughts..."*/}
//           {/*  className="min-h-[120px]"*/}
//           {/*/>*/}
//           <form.AppField
//             name={"content"}
//             children={(fieldApi) => (
//               <fieldApi.TextareaField
//                 placeholder={"Share your thoughts..."}
//                 className={"min-h-[120px]"}
//               />
//             )}
//           />
//           <div className="flex justify-end">
//             <Button type="submit">
//               <Send className="mr-2 h-4 w-4" />
//               Post Comment
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };
//
// const ArticleComments = (props: ArticleCommentsProps) => {
//   // Mock data for display
//   const {
//     data: comments,
//     isLoading,
//     isPending,
//     isError,
//     error,
//   } = api.posts.comments.useQuery({ postId: props.id });
//
//   const totalComments = 5;
//
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="flex items-center text-2xl font-bold">
//           <MessageCircle className="mr-2 h-6 w-6" />
//           Comments ({totalComments})
//         </h2>
//       </div>
//
//       <NewCommentForm />
//
//       <div className="space-y-4">
//         {comments?.map((comment) => (
//           <CommentComponent key={comment.id} comment={comment} depth={0} />
//         ))}
//       </div>
//     </div>
//   );
// };
//
// export default ArticleComments;

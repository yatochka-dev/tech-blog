import { TextShimmer } from "./text-shimmer";

export function Loading() {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center">
      <TextShimmer duration={1} className={"text-2xl"}>
        Loading article...
      </TextShimmer>
    </div>
  );
}

import { cn } from "@/lib/utils";

export default function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-3 p-4", className)}>
      <div className="h-5 w-5 animate-bounce rounded-full bg-intense-purple [animation-delay:-0.3s] [animation-duration:0.5s]" />
      <div className="h-5 w-5 animate-bounce rounded-full bg-intense-purple [animation-duration:0.5s] [animation-delay:-0.15s]" />
      <div className="h-5 w-5 animate-bounce rounded-full bg-intense-purple [animation-duration:0.5s]" />
    </div>
  );
}

import { cn } from "@/lib/utils";

export default function AxisProgressBar({
  progress,
  total,
  className
}: {
  progress: number;
  total: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        className,
        "relative w-full overflow-hidden rounded-2xl border border-[#CFC4DD]"
      )}
    >
      {total > 0 && (
        <div
          className="h-full bg-intense-purple"
          style={{ width: `${(progress / total) * 100}%` }}
        />
      )}
    </div>
  );
}

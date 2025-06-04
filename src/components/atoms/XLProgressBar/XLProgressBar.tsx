export default function XLProgressBar({
  progress,
  total
}: {
  progress: number;
  total: number;
}) {
  return (
    <div className="relative h-20 w-full overflow-hidden rounded-2xl border border-[#CFC4DD]">
      {total > 0 && (
        <div
          className="flex h-full items-center bg-intense-purple"
          style={{ width: `${(progress / total) * 100}%` }}
        >
          <p className="ml-12 text-start text-lg text-white">
            {progress} ações
          </p>
        </div>
      )}
    </div>
  );
}

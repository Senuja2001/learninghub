export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-bold text-white">
        LH
      </div>

      <div>
        <h1 className="text-lg font-bold">LearningHub</h1>
        <p className="text-muted-foreground text-xs">Powered by Kaishi Innovations</p>
      </div>
    </div>
  );
}

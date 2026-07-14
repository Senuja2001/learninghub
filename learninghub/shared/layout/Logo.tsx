export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold">
        LH
      </div>

      <div>
        <h1 className="font-bold text-lg">LearningHub</h1>
        <p className="text-xs text-muted-foreground">
          Powered by Kaishi Innovations
        </p>
      </div>
    </div>
  );
}
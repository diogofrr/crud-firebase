export default function Loading() {
  return (
    <div className="bg-titanWhite h-screen w-screen flex items-center justify-center">
      <div className="flex gap-2">
        <div className="w-5 h-5 rounded-full animate-pulse bg-chetwodeBlue"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-chetwodeBlue"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-chetwodeBlue"></div>
      </div>
    </div>
  );
}

export default function TableSkeleton() {
  return (
    <>
      <div className={`flex flex-col w-full`}>
        <div className="h-[80vh] w-full bg-gray-100 rounded-xl shadow-xl animate-pulse"></div>
      </div>
    </>
  );
}

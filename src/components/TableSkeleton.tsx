export default function TableSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="h-10 bg-gray-200 rounded-xl w-40 mb-4 self-end"></div>
            <div className="h-[80vh] bg-gray-200 w-full"></div>
        </div>
    )
}
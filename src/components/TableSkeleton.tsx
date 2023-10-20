export default function TableSkeleton() {
    return (
        <>
            {/* <div className={`h-screen bg-gray-100 lg:w-[17rem] w-0 overflow-hidden rounded-r-2xl shadow-xl fixed top-0 left-0 z-20`}></div> */}
            <div className={`flex flex-col w-full`}>
                <div className="h-[80vh] w-full bg-gray-100 rounded-xl shadow-xl animate-pulse"></div>
            </div>
        </>
    )
}
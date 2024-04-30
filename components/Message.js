export default function Message({ children, avatar, username, description, timestamp }) {
    // let formattedDate;
    // if(timestamp){
    //     const date = timestamp.toDate();
    //     const seconds = date.getTime() / 1000;
    //     formattedDate = new Date(seconds * 1000).toLocaleDateString();
    // }
    return (
        <div className="bg-white dark:bg-[#030c1e] p-4 font-medium border-b-2 dark:border-none dark:mb-2 rounded-lg shadow-lg dark:shadow-none">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full" />
                {username === "Aman Shahid" ? <h2 className="text-cyan-800 dark:text-amber-400">Aman Shahid (Dev)</h2> : <h2>{username}</h2>}
            </div>
            {/* {timestamp && <p className="mt-2 font-bold text-xs text-gray-500">{formattedDate}</p>} */}
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}
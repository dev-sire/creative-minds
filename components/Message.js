
export default function Message({ children, avatar, username, description, timestamp }) {
    const date = new Date(timestamp.seconds * 1000);
    const formattedDate = date.toLocaleDateString();
    return (
        <div className="bg-white p-4 font-medium border-b-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full" />
                {username === "Aman Shahid" ? <h2 className="text-cyan-800">Aman Shahid (Dev)</h2> : <h2>{username}</h2>}
            </div>
            <p className="mt-2 font-bold text-xs text-gray-500">{formattedDate}</p>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}
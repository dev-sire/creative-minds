export default function Message({ children, avatar, username, description }) {
    return (
        <div className="bg-white p-8 font-medium border-b-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full" />
                {username === "Aman Shahid" ? <h2 className="text-cyan-600">Aman (Developer)</h2> : <h2>{username}</h2>}
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}
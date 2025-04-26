export default function WorkshopCard () {
    return (
        <div className="dark:bg-gray-800 shadow-lg overflow-hidden rounded-lg cursor-pointer hover:shadow-xl transition">
            <div classname="h-48 bg-gray-200">
                {/* Placeholder for image or video */}
                </div>
            <div className="p-4">
                <h2 classname="text-xl font-semibold">Workshop Title</h2>
                <p classname="text-gray-600 text-sm mt-2">Short decription here.</p>
                </div>
        </div>
    );
}

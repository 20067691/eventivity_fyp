export default function WorkshopCard({ workshop, onClick }) {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden cursor-pointer"
      >
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          {/* Placeholder for workshop image */}
          <span className="text-gray-500">Image Placeholder</span>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-[#552834]">{workshop.title}</h2>
          <p className="text-gray-600 mt-2 text-sm">{workshop.description}</p>
        </div>
      </div>
    );
  }

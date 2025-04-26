import WorkshopCard from "../components/WorkshopCard";

export default function WorkshopPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Workshops</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <WorkshopCard />
            </div>
        </div>
    );
}
//WorkshopPage.jsx
import WorkshopCard from "../components/WorkshopCard";
import WorkshopModal from "../components/WorkshopModal";
import { useState } from "react";
import { useEvent } from "../context/EventContext";
import workshops from "../data/workshopData";



export default function WorkshopPage() {
    const { selectedEvent } = useEvent();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);

    console.log("Selected Event:", selectedEvent);
    //console.log("Filtered Workshops:", filteredWorkshops);

    const openModal = (workshop) => {
        console.log("Opening Modal for Workshop:", workshop.title);
        setSelectedWorkshop(workshop);
        setModalOpen(true);
    }

    const closeModal = () => {
        setSelectedWorkshop(null);
        setModalOpen(false);
    }

    const filteredWorkshops = workshops.filter(
        (w) => w.eventId === selectedEvent.id
    );

    console.log("Filtered Workshops:", filteredWorkshops);


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6" style={{ color: selectedEvent?.theme?.text || '#212122' }}>
                Workshops for {selectedEvent?.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkshops.map((workshop) => (
                    <WorkshopCard
                        key={workshop.slug}
                        workshop={workshop}
                        onClick={() => openModal(workshop)}
                    />
                ))}
            </div>

            {modalOpen && selectedWorkshop && (
                <WorkshopModal onClose={closeModal} workshop={selectedWorkshop} />
            )}
        </div>
    );
}
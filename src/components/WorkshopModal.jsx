
// WorkshopModal.jsx
// This component is a modal that displays workshop details when a workshop card is clicked.
import { useNavigate } from "react-router-dom"
import CloseButton from "./CloseButton"
import { InteractiveHoverButton } from "./InteractiveHoverButton"


export default function WorkshopModal({ onClose, workshop }) {
    const navigate = useNavigate();

    const handleViewFull = () => {
        console.log("Navigating to Workshop:", workshop.slug);
        if (workshop.slug) {
            navigate(`/app/workshops/${workshop.slug}`);
        }
        else {
            navigate("/app/workshops");
        }
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md h-[450px] flex flex-col">
            <CloseButton onClick={onClose} />
            
            <div className="flex-grow overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{workshop.title}</h2>
              <p className="text-gray-700 mb-4">{workshop.description}</p>
            </div>
      
            <div className="flex justify-end mt-4">
              <InteractiveHoverButton onClick={handleViewFull}>
                View Full Workshop
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
      );
    }
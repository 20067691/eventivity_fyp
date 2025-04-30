import { useLocation, useNavigate, useParams } from "react-router-dom";
import workshops from "../data/workshopData";
import useTheme from "../hooks/useTheme";

export default function WorkshopDetail() {
  const { slug } = useParams(); // fallback key
  const location = useLocation();
  const navigate = useNavigate();
  const { text } = useTheme();

  const workshop = location.state?.workshop || workshops.find((w) => w.slug === slug);

  if (!workshop) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Workshop not found</h1>
        <button
          onClick={() => navigate("/app/workshops")}
          className="text-[#9c40ff] underline"
        >
          Back to Workshops
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4"style={{color: text}}>Workshop: {workshop.title}</h1>
      <p className="text-gray-700">{workshop.description}</p>
    </div>
  );
}
import { useParams } from "react-router-dom";

export default function WorkshopDetail() {
    const { slug } = useParams();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4"> Workshop: {slug} </h1>
            <p className="text-gray-700"> Full detailed information about the workshop will be displayed here. </p>
        </div>
    );
}
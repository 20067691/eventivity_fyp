import { useLocation, useParams } from "react-router-dom";
import workshops from "../data/workshopData";
import { useState } from "react";
import QRCode from "react-qr-code";
import useTheme from "../hooks/useTheme";

export default function WorkshopDetail() {
    const { slug } = useParams();
    const location = useLocation();
    const workshop = location.state?.workshop || workshops.find((w) => w.slug === slug);
    const [activeTab, setActiveTab] = useState("overview");
    const { text, accent } = useTheme();

    if (!workshop) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Workshop not found</h1>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: text }}>{workshop.title}</h1>

            {/* Tabs */}
            <div className="mb-4 border-b border-gray-200">
                <ul className="flex justify-center flex-wrap -mb-px text-sm font-medium text-center">
                    {['overview', 'video', 'qr'].map((tab) => (
                        <li key={tab} className="me-2">
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`inline-block p-4 border-b-2 rounded-t-lg transition ${activeTab === tab
                                    ? "border-b-2 border-solid"
                                    : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
                                    }`}
                                style={activeTab === tab ? { color: accent, borderColor: accent } : {}}
                            >
                                {tab === "overview" ? "Overview" : tab === "video" ? "Video" : "QR Code"}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tab Content */}
            <div className="max-w-3xl mx-auto">
                {activeTab === "overview" && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">{workshop.description}</p>
                    </div>
                )}

                {activeTab === "video" && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <video
                            src="/workshop-video.mp4"
                            autoPlay
                            muted
                            controls
                            className="w-full rounded"
                        />
                    </div>
                )}

                {activeTab === "qr" && (
                    <div className="p-4 bg-gray-50 rounded-lg flex justify-center">
                        <QRCode value={`https://main.d2c6n3hjfqezye.amplifyapp.com/app/workshops/${workshop.slug}`} size={160} />
                    </div>
                )}
            </div>
        </div>
    );
}

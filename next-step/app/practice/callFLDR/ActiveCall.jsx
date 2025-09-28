import AssistantSpeechIndicator from "./SpeechIndicator";
import VolumeLevel from "./VolumeLevel";

const ActiveCallDetails = ({
  assistantIsSpeaking,
  volumeLevel,
  endCallCallback,
}) => {
  // Fullscreen assistant visualizer overlay. The user visualizer was removed per request.
  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Background dim + subtle blur */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      {/* Canvas visualizer fills the viewport */}
      <div className="absolute inset-0">
        <VolumeLevel volume={volumeLevel ?? 0} isSpeaking={assistantIsSpeaking} />
      </div>

      {/* Overlay controls: speech indicator and button */}
      <div className="relative z-60 flex flex-col justify-between h-full">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
            <span className="text-sm text-gray-200 font-medium">Assistant</span>
          </div>
        </div>

        <div className="flex justify-center pb-12">
          <button
            onClick={endCallCallback}
            className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:opacity-95 shadow-2xl"
          >
            View Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveCallDetails;
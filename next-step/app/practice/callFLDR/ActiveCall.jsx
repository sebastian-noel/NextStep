import AssistantSpeechIndicator from "./SpeechIndicator";
import VolumeLevel from "./VolumeLevel";

const ActiveCallDetails = ({
  assistantIsSpeaking,
  volumeLevel,
  endCallCallback,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-slate-900/70 text-white rounded-xl shadow-2xl p-4 backdrop-blur-sm border border-white/10">
      <div className="flex items-center justify-between gap-3">
        <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
        <VolumeLevel volume={volumeLevel} />
      </div>
      <div className="mt-3 flex justify-end">
        <button onClick={endCallCallback} className="px-4 py-2 bg-white text-black rounded-full font-semibold hover:opacity-90 shadow">View Results</button>
      </div>
    </div>
  );
};

export default ActiveCallDetails
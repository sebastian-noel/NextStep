// Small accessible speech indicator used near the visualizer.
const AssistantSpeechIndicator = ({ isSpeaking = false }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium ${
        isSpeaking ? 'bg-green-600/20 text-green-300' : 'bg-gray-800/40 text-gray-300'
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}
      ></span>
      <span>{isSpeaking ? 'Speaking...' : 'Waiting'}</span>
    </div>
  );
};

export default AssistantSpeechIndicator;
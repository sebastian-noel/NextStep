// Minimal, self-contained speech indicator component.
// Previously this file accidentally imported itself which caused a circular import
// and runtime module resolution issues. Keep this component small and pure.

const AssistantSpeechIndicator = ({ isSpeaking = false }) => {
  return (
    <div className={`speech-indicator ${isSpeaking ? "speaking" : "idle"}`}>
      {isSpeaking ? "Speaking..." : "Waiting..."}
    </div>
  );
};

export default AssistantSpeechIndicator;
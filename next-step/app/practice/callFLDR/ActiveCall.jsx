import AssistantSpeechIndicator from "./SpeechIndicator";
import VolumeLevel from "./VolumeLevel";

const ActiveCallDetails = ({
  assistantIsSpeaking,
  volumeLevel,
  endCallCallback,
}) => {
  return (
    <div className="active-call-detail">
      <div className="call-info">
        <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
        <VolumeLevel volume={volumeLevel} />
      </div>
      <div className="end-call-button">
        <button onClick={endCallCallback} >View Results</button>
      </div>
    </div>
  );
};

export default ActiveCallDetails
'use client'
import React, { useState, useEffect, ChangeEvent } from "react";
import { vapi, startAssistant, stopAssistant } from "./ai";
import ActiveCallDetails from "./callFLDR/ActiveCall";

type CallResult = {
  analysis: {
    structuredData: {
      Situation_Score: number;
      Task_Score: number;
      Action_Score: number;
      Result_Score: number;
    };
  };
  summary: string;
};

export default function TestPage() {
  const [started, setStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState<boolean>(false);
  const [volumeLevel, setVolumeLevel] = useState<number>(0);
  const [callId, setCallId] = useState<string>("");
  const [callResult, setCallResult] = useState<CallResult | null>(null);
  const [loadingResult, setLoadingResult] = useState<boolean>(false);
  const [showImages, setShowImages] = useState<boolean>(true);
  const [growCham, startGrowCham] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const titleImageClassName = `title-image ${!showImages ? 'transparent' : ''}`;
  const subtitleImageClassName = `subtitle-image ${!showImages ? 'transparent' : ''}`;

  useEffect(() => {
    vapi
      .on("call-start", () => {
        setLoading(false);
        setStarted(true);
      })
      .on("call-end", () => {
        setStarted(false);
        setLoading(false);
      })
      .on("speech-start", () => {
        setAssistantIsSpeaking(true);
      })
      .on("speech-end", () => {
        setAssistantIsSpeaking(false);
      })
      .on("volume-level", (level: number) => {
        setVolumeLevel(level);
      });
  }, []);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleStart = async () => {
    setLoading(true);
    setShowImages(false);
    const data = await startAssistant("Health");
    if (data && data.id) {
      setCallId(data.id);
    }
  };

  const handleStop = () => {
    stopAssistant();
    startGrowCham(true);
    const controller = new AbortController();
    (async () => {
      const result = await pollCallDetails(callId, { signal: controller.signal });
      if (result) setCallResult(result);
      setLoadingResult(false);
    })();

    getCallDetails();
  };

  const getCallDetails = (interval: number = 3000) => {
    setLoadingResult(true);
    fetch("/call-details?call_id=" + callId)
      .then((response) => response.json())
      .then((data: CallResult) => {
        if (data.analysis && data.summary) {
          console.log(data);
          setCallResult(data);
          setLoadingResult(false);
        } else {
          setTimeout(() => getCallDetails(interval), interval);
        }
      })
      .catch((error) => alert(error));
  };

  const pollCallDetails = async (
    callIdToPoll: string,
    {
      interval = 3000,
      maxAttempts = 20,
      signal,
    }: {
      interval?: number;
      maxAttempts?: number;
      signal?: AbortSignal;
    } = {}
  ): Promise<CallResult | null> => {
    if (!callIdToPoll) return null;
    setLoadingResult(true);
    let attempts = 0;
    while (attempts < maxAttempts && !(signal && signal.aborted)) {
      attempts++;
      try {
        const res = await fetch(`/call-details?call_id=${callIdToPoll}`, {
          signal,
        });
        const data: CallResult = await res.json();
        if (data && data.analysis && data.summary) {
          return data;
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log('poll aborted');
          break;
        }
        console.error('polling error', err);
        break;
      }
      await new Promise((r) => setTimeout(r, interval));
    }
    return null;
  };

  const showForm = !loading && !started && !loadingResult && !callResult;

  useEffect(() => {
    const onPageLoad = () => {
      handleStart()
    };

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

 return (
  <>
    <div className="flex flex-col justify-center items-center w-screen h-screen relative overflow-hidden text-white">
      {showForm && (
        <>
          {!started && (
            <button
              onClick={handleStart}
              disabled={false}
              className="mt-[20%] px-[90px] py-[25px] bg-white text-black rounded-full text-lg font-bold shadow-lg transition duration-300 transform hover:bg-gray-600 hover:-translate-y-0.5 disabled:bg-[#353535] disabled:cursor-not-allowed"
            >
              Start your interview
            </button>
          )}
        </>
      )}

      {loadingResult && <p className="fixed translate-y-[400%] text-transparent"></p>}

      {!loadingResult && callResult && (
        <div className="bg-[rgba(44,44,44,0.002)] rounded-xl p-5 mt-5 text-white w-11/12 max-w-full h-[70%] text-left">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-6 py-3 bg-[rgba(255,255,255,0.05)] rounded-xl shadow-inner transform scale-100 transition duration-300 hover:bg-[rgba(255,255,255,0.1)] hover:scale-[1.02] max-w-[25%]">
              <p className="m-0 text-base font-medium">Situation Score:</p>
              <span className="font-bold text-2xl text-white drop-shadow-lg">
                {callResult.analysis.structuredData.Situation_Score} /10
              </span>
            </div>
            <div className="flex justify-between items-center px-6 py-3 bg-[rgba(255,255,255,0.05)] rounded-xl shadow-inner transform scale-100 transition duration-300 hover:bg-[rgba(255,255,255,0.1)] hover:scale-[1.02] max-w-[25%]">
              <p className="m-0 text-base font-medium">Task Score:</p>
              <span className="font-bold text-2xl text-white drop-shadow-lg">
                {callResult.analysis.structuredData.Task_Score} /10
              </span>
            </div>
            <div className="flex justify-between items-center px-6 py-3 bg-[rgba(255,255,255,0.05)] rounded-xl shadow-inner transform scale-100 transition duration-300 hover:bg-[rgba(255,255,255,0.1)] hover:scale-[1.02] max-w-[25%]">
              <p className="m-0 text-base font-medium">Action Score:</p>
              <span className="font-bold text-2xl text-white drop-shadow-lg">
                {callResult.analysis.structuredData.Action_Score} /10
              </span>
            </div>
            <div className="flex justify-between items-center px-6 py-3 bg-[rgba(255,255,255,0.05)] rounded-xl shadow-inner transform scale-100 transition duration-300 hover:bg-[rgba(255,255,255,0.1)] hover:scale-[1.02] max-w-[25%]">
              <p className="m-0 text-base font-medium">Result Score:</p>
              <span className="font-bold text-2xl text-white drop-shadow-lg">
                {callResult.analysis.structuredData.Result_Score} /10
              </span>
            </div>
          </div>
          <div className="flex items-end px-6 py-3 rounded-[25px] transform fixed translate-x-[230%] translate-y-[-90%] animation-slideIn font-montserrat max-w-[25%] max-h-[55%]">
            <p className="my-2 text-base">{callResult.summary}</p>
          </div>
        </div>
      )}

      {(loading || loadingResult) && (
        <div className="flex justify-center items-center fixed translate-y-[300%]">
          <div className="inline-block w-10 h-10 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
        </div>
      )}

      {started && (
        <ActiveCallDetails
          assistantIsSpeaking={assistantIsSpeaking}
          volumeLevel={volumeLevel}
          endCallCallback={handleStop}
        />
      )}
    </div>
  </>
);

}

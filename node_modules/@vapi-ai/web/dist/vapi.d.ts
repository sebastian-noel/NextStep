import type { ChatCompletionMessageParam } from 'openai/resources';
import { DailyCall, DailyAdvancedConfig, DailyFactoryOptions, DailyParticipant, DailyVideoSendSettings } from '@daily-co/daily-js';
import EventEmitter from 'events';
import { Call, CreateSquadDTO, CreateAssistantDTO, AssistantOverrides, CreateWorkflowDTO, WorkflowOverrides } from './api';
export interface AddMessageMessage {
    type: 'add-message';
    message: ChatCompletionMessageParam;
    triggerResponseEnabled?: boolean;
}
export interface ControlMessages {
    type: 'control';
    control: 'mute-assistant' | 'unmute-assistant' | 'say-first-message';
    videoRecordingStartDelaySeconds?: number;
}
export interface SayMessage {
    type: 'say';
    message: string;
    endCallAfterSpoken?: boolean;
    interruptionsEnabled?: boolean;
    interruptAssistantEnabled?: boolean;
}
type VapiClientToServerMessage = AddMessageMessage | ControlMessages | SayMessage;
type VapiEventNames = 'call-end' | 'call-start' | 'volume-level' | 'speech-start' | 'speech-end' | 'message' | 'video' | 'error' | 'camera-error' | 'network-quality-change' | 'network-connection' | 'daily-participant-updated' | 'call-start-progress' | 'call-start-success' | 'call-start-failed';
interface CallStartProgressEvent {
    stage: string;
    status: 'started' | 'completed' | 'failed';
    duration?: number;
    timestamp: string;
    metadata?: Record<string, any>;
}
interface CallStartSuccessEvent {
    totalDuration: number;
    callId?: string;
    timestamp: string;
}
interface CallStartFailedEvent {
    stage: string;
    totalDuration: number;
    error: string;
    errorStack?: string;
    timestamp: string;
    context: Record<string, any>;
}
type VapiEventListeners = {
    'call-end': () => void;
    'call-start': () => void;
    'volume-level': (volume: number) => void;
    'speech-start': () => void;
    'speech-end': () => void;
    video: (track: MediaStreamTrack) => void;
    message: (message: any) => void;
    error: (error: any) => void;
    'camera-error': (error: any) => void;
    'network-quality-change': (event: any) => void;
    'network-connection': (event: any) => void;
    'daily-participant-updated': (participant: DailyParticipant) => void;
    'call-start-progress': (event: CallStartProgressEvent) => void;
    'call-start-success': (event: CallStartSuccessEvent) => void;
    'call-start-failed': (event: CallStartFailedEvent) => void;
};
declare class VapiEventEmitter extends EventEmitter {
    on<E extends VapiEventNames>(event: E, listener: VapiEventListeners[E]): this;
    once<E extends VapiEventNames>(event: E, listener: VapiEventListeners[E]): this;
    emit<E extends VapiEventNames>(event: E, ...args: Parameters<VapiEventListeners[E]>): boolean;
    removeListener<E extends VapiEventNames>(event: E, listener: VapiEventListeners[E]): this;
    removeAllListeners(event?: VapiEventNames): this;
}
export default class Vapi extends VapiEventEmitter {
    private started;
    private call;
    private speakingTimeout;
    private dailyCallConfig;
    private dailyCallObject;
    private hasEmittedCallEndedStatus;
    constructor(apiToken: string, apiBaseUrl?: string, dailyCallConfig?: Pick<DailyAdvancedConfig, 'avoidEval' | 'alwaysIncludeMicInPermissionPrompt'>, dailyCallObject?: Pick<DailyFactoryOptions, 'audioSource' | 'startAudioOff'>);
    private cleanup;
    private isMobileDevice;
    private sleep;
    start(assistant?: CreateAssistantDTO | string, assistantOverrides?: AssistantOverrides, squad?: CreateSquadDTO | string, workflow?: CreateWorkflowDTO | string, workflowOverrides?: WorkflowOverrides): Promise<Call | null>;
    private onAppMessage;
    private handleRemoteParticipantsAudioLevel;
    stop(): Promise<void>;
    send(message: VapiClientToServerMessage): void;
    setMuted(mute: boolean): void;
    isMuted(): boolean;
    say(message: string, endCallAfterSpoken?: boolean, interruptionsEnabled?: boolean, interruptAssistantEnabled?: boolean): void;
    setInputDevicesAsync(options: Parameters<DailyCall['setInputDevicesAsync']>[0]): Promise<void>;
    increaseMicLevel(gain: number): Promise<void>;
    setOutputDeviceAsync(options: Parameters<DailyCall['setOutputDeviceAsync']>[0]): void;
    getDailyCallObject(): DailyCall | null;
    startScreenSharing(displayMediaOptions?: DisplayMediaStreamOptions, screenVideoSendSettings?: DailyVideoSendSettings): void;
    stopScreenSharing(): void;
}
export {};

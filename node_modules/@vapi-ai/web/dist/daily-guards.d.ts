import type { DailyCall, DailyAdvancedConfig, DailyFactoryOptions } from '@daily-co/daily-js';
export interface SafeDailyAdvancedConfig extends Omit<DailyAdvancedConfig, 'alwaysIncludeMicInPermissionPrompt'> {
    alwaysIncludeMicInPermissionPrompt?: true;
}
export interface SafeDailyFactoryOptions extends Omit<DailyFactoryOptions, 'audioSource'> {
    audioSource?: string | boolean | MediaStreamTrack;
}
export declare function createSafeDailyConfig(config?: Pick<DailyAdvancedConfig, 'avoidEval' | 'alwaysIncludeMicInPermissionPrompt'>): SafeDailyAdvancedConfig;
export declare function safeSetLocalAudio(call: DailyCall | null, enabled: boolean): void;
export declare function safeSetInputDevicesAsync(call: DailyCall | null, options: Parameters<DailyCall['setInputDevicesAsync']>[0]): Promise<void>;
export declare function createSafeDailyFactoryOptions(options?: Pick<DailyFactoryOptions, 'audioSource' | 'startAudioOff'>): SafeDailyFactoryOptions;

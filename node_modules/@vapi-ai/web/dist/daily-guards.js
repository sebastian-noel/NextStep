"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSafeDailyConfig = createSafeDailyConfig;
exports.safeSetLocalAudio = safeSetLocalAudio;
exports.safeSetInputDevicesAsync = safeSetInputDevicesAsync;
exports.createSafeDailyFactoryOptions = createSafeDailyFactoryOptions;
function createSafeDailyConfig(config) {
    if (!config)
        return {};
    const { alwaysIncludeMicInPermissionPrompt, ...rest } = config;
    // Force true or remove the property entirely. This can cause Chrome 140+ issues
    if (alwaysIncludeMicInPermissionPrompt === false) {
        console.warn('[Vapi] alwaysIncludeMicInPermissionPrompt:false detected. ' +
            'This can cause Chrome 140+ issues. Removing the property.');
        return rest;
    }
    return config;
}
function safeSetLocalAudio(call, enabled) {
    if (!call) {
        throw new Error('Call object is not available.');
    }
    // Never use forceDiscardTrack. This can cause Chrome 140+ issues
    call.setLocalAudio(enabled);
}
async function safeSetInputDevicesAsync(call, options) {
    if (!call) {
        throw new Error('Call object is not available.');
    }
    // Validate audioSource
    if ('audioSource' in options && options.audioSource === false) {
        console.warn('[Vapi] setInputDevicesAsync with audioSource:false detected. ' +
            'This can cause Chrome 140+ issues. Using default device instead.');
        const { audioSource, ...safeOptions } = options;
        await call.setInputDevicesAsync(safeOptions);
        return;
    }
    await call.setInputDevicesAsync(options);
}
function createSafeDailyFactoryOptions(options) {
    if (!options)
        return {};
    // Ensure audioSource is never false
    if (options.audioSource === false) {
        console.warn('[Vapi] audioSource:false detected in factory options. ' +
            'This can cause Chrome 140+ issues. Defaulting to true.');
        return { ...options, audioSource: true };
    }
    return options;
}

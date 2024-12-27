export const SIP_KEY = 1;
export const LUMPSUM_KEY = 2;
export const STEPSIP_KEY = 3;

export const SIP_LABEL = 'SIP';
export const LUMPSUM_LABEL = 'Lumpsum';
export const STEPSIP_LABEL = 'Step Up SIP';

export const modes = [
    { key: SIP_KEY, label: SIP_LABEL },
    { key: LUMPSUM_KEY, label: LUMPSUM_LABEL },
    { key: STEPSIP_KEY, label: STEPSIP_LABEL },
]

export const defaultMode = SIP_KEY;

export const SIP_INVESTMENT_MIN = 100;
export const SIP_INVESTMENT_MAX = 100000;
export const SIP_INVESTMENT_STEP = 1000;
export const LUMPSUM_INVESTMENT_MIN = 1000;
export const LUMPSUM_INVESTMENT_MAX = 10000000;
export const RETURNS_MIN = 1;
export const RETURNS_MAX = 100;
export const INVESTMENT_PERIOD_MIN = 1;
export const INVESTMENT_PERIOD_MAX = 100;

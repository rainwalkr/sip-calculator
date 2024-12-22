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
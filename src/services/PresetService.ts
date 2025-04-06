import { CalculatorOperands } from "../components/Controls/Controls.types";
import { NUMBER_FORMAT, SIP_KEY } from "../configs/calculator";
import { PRESET_LOCAL_STORAGE_KEY, PRESET_TYPE_CUSTOM, PRESET_TYPE_SYSTEM } from "../configs/preset";
import { StorageService } from "./StorageService";

export class PresetService {
    storageSerive;

    static #systemPresets = [
        {
            label: '15 rule',
            mode: SIP_KEY,
            investment: 15000,
            returnRateAnnual: 15,
            timePeriodYear: 15,
            type: PRESET_TYPE_SYSTEM,
            createdAt:Date.now(),
            lastAppliedAt:null,
            appliedCount:0
        },
        {
            label: '10k\u202212%\u202220y',
            mode: SIP_KEY,
            investment: 10000,
            returnRateAnnual: 12,
            timePeriodYear: 20,
            type: PRESET_TYPE_SYSTEM,
            createdAt:Date.now(),
            lastAppliedAt:null,
            appliedCount:0
        }
    ]

    constructor(storageSerive:StorageService){
        this.storageSerive = storageSerive
        this.storeSystemPresets()
    }

    /**
     * store system presets if they haven't been stored already
     */
    storeSystemPresets(){
        let presets = this.storageSerive.get(PRESET_LOCAL_STORAGE_KEY,[]);
        let systemPresetsCount =  presets.filter((preset:any) => preset.mode === PRESET_TYPE_SYSTEM).length
        // store only if there aren't any system presets saved prior
        if(systemPresetsCount === 0){
            this.storageSerive.addCollectionEntries(PRESET_LOCAL_STORAGE_KEY,PresetService.#systemPresets)
        }
    }

    /**
     * get presets
     */
    get() {
        let presets = this.storageSerive.get(PRESET_LOCAL_STORAGE_KEY);
        // sort by createdAt desc
        return presets.sort((a:any,b:any) => a.createdAt > b.createdAt ? -1 : 1)
            .map((preset:any) => {
                const {createdAt,lastAppliedAt,appliedTimestamps, ...rest} = preset
                return rest;
            })
    }

    /**
     * check if preset is present
     * @param criteria 
     * @returns boolean
     */
    isPresent(criteria: any) : boolean{
        return this.storageSerive.get(PRESET_LOCAL_STORAGE_KEY).findIndex((entry:any) => {
            return criteria.investment == entry.investment 
                && criteria.returnRateAnnual == entry.returnRateAnnual 
                && criteria.timePeriodYear == entry.timePeriodYear
                && criteria.mode == entry.mode;
        }) !== -1
    }

    /**
     * generate label for calcOperands
     * @param calcOperands 
     * @returns 
     */
    generateLabel(calcOperands:CalculatorOperands){
        let investmentFormatted = new Intl.NumberFormat(NUMBER_FORMAT.LOCALE, {
            notation: "compact",
            compactDisplay: "short",
          }).format(calcOperands.investment)
        return `${investmentFormatted}\u2022${calcOperands.returnRateAnnual}%\u2022${calcOperands.timePeriodYear}Y`
    }

    /**
     * save preset
     * @param data 
     * @returns 
     */
    save(data: any) {
        let preset = {...data}
        if (this.isPresent(preset)) {
           return {status:false} 
        }
        preset.type ??= PRESET_TYPE_CUSTOM
        preset.label ??= this.generateLabel(preset)
        preset['createdAt'] = Date.now();
        preset['lastAppliedAt'] = null;
        preset['appliedCount'] = 0;
        this.storageSerive.addCollectionEntry(PRESET_LOCAL_STORAGE_KEY,preset)
        return {status:true}
    }
    
    recordPresetAppliedTime(id:string){
        this.storageSerive.patchCollectionEntry(PRESET_LOCAL_STORAGE_KEY,id,((entry:any) => {
            entry['lastAppliedAt'] = Date.now();
            entry['appliedCount']++
            return entry;
        }))
    }

    /**
     * remove preset
     * @param id 
     * @returns 
     */
    remove(id:string) {
        return this.storageSerive.removeCollectionEntry(PRESET_LOCAL_STORAGE_KEY,id)
    }
}
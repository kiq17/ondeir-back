export function loadEnvironmentVariable(keyname: string) {
    const envVar = process.env[keyname];
    
    if (!envVar) {
        throw new Error(`A configurção deve ter ${keyname}`);
    }
    
    return envVar;
}
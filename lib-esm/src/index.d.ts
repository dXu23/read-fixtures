interface FixInterface {
    [fileName: string]: Object | undefined;
}
export default class Fixtures implements FixInterface {
    [fileName: string]: Object | undefined;
    constructor(fpath?: string);
    private clone;
    reset(): void;
}
export {};

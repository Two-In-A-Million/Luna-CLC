class selectionSectionList {
    sectionName: string;
    levelCap: number;
    selected: number;

    constructor(sectionName: string, levelCap: number, selected: number){
        this.sectionName = sectionName;
        this.levelCap = levelCap;
        this.selected = selected;
    }
}

export default selectionSectionList;
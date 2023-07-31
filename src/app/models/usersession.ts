export class UserSession {
    userId: number;
    userFullName: string;
    roleId: number;
    authToken: string;
    roleName: string;
    email: string;
    mobileNumber: string;
    languageType: number;
    clientId: any = [];
    currentClientId: any;
    currentClientName: any;
    isDynamicPassword: boolean;
    role: any = [];
    subDivisionId: number;
    regionId:number;
    divisionId:number;
    filterdivisionId:number;
    filterregionId:number
    filtersubdivisionId: number;
    districtId:number;
    blockId:number;
    filterdistrictId:number;
    filterblockId:number;
}

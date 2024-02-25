
export interface driver{
    _id: string,
    firstName: string,
    lastName: string,
    number: number,
    team: team,
    positionsGained?: number,
    points?: number,

}

export interface team{
    _id: string,
    name: string,
    colorHex: string,
    drivers: [driver],
    PU: string,
    logoUrl: URL

}

export interface bonusQuestion{
    Q?: string,
    A?:string,
    Q_id: number,
    R?: string;
    points?: number,
}

export interface bonusQuestionResult{
    R?: string,
    Q_id: number,
    Q?: string,
    A?:string,
    points?: number,
}

export interface race{
    _id: string,
    name: string,
    race_id: number,
    country: string,
    results: [driver], //segun se debe usar Types.DocumentArray<driver> https://mongoosejs.com/docs/typescript/schemas.html
    fastestLap: driver,
    pole: driver,
    lastPlace: driver,
    firstRetirement: driver,
    dnfResults:driver[],
    raceJoker: driver,
    topTeam: team,
    schedule: {
        FP1: Date,
        FP2: Date,
        FP3: Date,
        Qualy: Date,
        Race: Date
    }
    team_rosters:[team],
    bonus:[bonusQuestion],
    flagUrl: string,

}

export interface raceResults{
    top5: [driver],
    extraDNF?: driver,
    extraFastLap: driver,
    extraPole: driver,
    extraLast: driver,
    dnfResults:driver[],
    raceJoker: driver,
    topTeam: team


}

export interface questionResults{
    bonus:[bonusQuestionResult]
}

export interface bonusInterface{
    bonus:Array<bonusQuestionResult>
}



export interface calendar{ races: [race]}
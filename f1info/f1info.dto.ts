
export interface driver{
    _id: string,
    firstName: string,
    lastName: string,
    number: number,
    team: team,

}

export interface team{
    _id: string,
    name: string,
    colorHex: string,
    driver1: driver,
    driver2: driver,
    PU: string,
    logoUrl: URL

}

export interface bonusQuestion{
    Q: string,
    A:[string],
    Q_id: number
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

export interface calendar{ races: [race]}
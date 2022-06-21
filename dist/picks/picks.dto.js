"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRaceStandingsPipeline = exports.getBreakdownPipeline = exports.standingsAggregation = void 0;
exports.standingsAggregation = [
    {
        '$addFields': {
            'userIdObj': {
                '$toObjectId': '$userId'
            }
        }
    }, {
        '$lookup': {
            'from': 'users',
            'localField': 'userIdObj',
            'foreignField': '_id',
            'as': 'user'
        }
    }, {
        '$group': {
            '_id': '$userId',
            'totalPoints': {
                '$sum': '$userPoints'
            },
            'user': {
                '$first': '$user'
            }
        }
    }, {
        '$sort': {
            'totalPoints': -1
        }
    }, {
        '$project': {
            'user': {
                '$concat': [
                    {
                        '$arrayElemAt': [
                            '$user.firstName', 0
                        ]
                    }, ' ', {
                        '$arrayElemAt': [
                            '$user.lastName', 0
                        ]
                    }
                ]
            },
            'totalPoints': '$totalPoints'
        }
    }
];
function getBreakdownPipeline(userId) {
    const pipeline = [
        {
            '$addFields': {
                'userIdObj': {
                    '$toObjectId': '$userId'
                }
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'userIdObj',
                'foreignField': '_id',
                'as': 'user'
            }
        }, {
            '$match': {
                'userId': userId
            }
        }, {
            '$set': {
                'raceResults': {
                    '$reduce': {
                        'input': '$race.results',
                        'initialValue': {
                            'sum': {
                                '$add': [
                                    '$race.fastestLap.points', '$race.pole.points', '$race.lastPlace.points', '$race.firstRetirement.points', 0
                                ]
                            }
                        },
                        'in': {
                            'sum': {
                                '$add': [
                                    '$$value.sum', '$$this.points'
                                ]
                            }
                        }
                    }
                },
                'bonus': {
                    '$reduce': {
                        'input': '$race.bonus',
                        'initialValue': {
                            'sum': 0
                        },
                        'in': {
                            'sum': {
                                '$add': [
                                    '$$value.sum', '$$this.points'
                                ]
                            }
                        }
                    }
                }
            }
        }, {
            '$project': {
                'user': {
                    '$concat': [
                        {
                            '$arrayElemAt': [
                                '$user.firstName', 0
                            ]
                        }, ' ', {
                            '$arrayElemAt': [
                                '$user.lastName', 0
                            ]
                        }
                    ]
                },
                'race': '$race',
                'raceResults': '$raceResults.sum',
                'bonus': '$bonus.sum',
                'joker': '$jokerDriver.points',
                'penalty': '$penalty',
                'total': {
                    '$add': [
                        '$raceResults.sum', '$bonus.sum', '$jokerDriver.points', '$penalty'
                    ]
                }
            }
        }, {
            '$sort': {
                'race.race_id': 1
            }
        }
    ];
    return pipeline;
}
exports.getBreakdownPipeline = getBreakdownPipeline;
function getRaceStandingsPipeline(raceId) {
    const raceIdInt = parseInt(raceId);
    const pipeline = [
        {
            '$addFields': {
                'userIdObj': {
                    '$toObjectId': '$userId'
                }
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'userIdObj',
                'foreignField': '_id',
                'as': 'user'
            }
        }, {
            '$match': {
                'race.race_id': raceIdInt
            }
        }, {
            '$set': {
                'raceResults': {
                    '$reduce': {
                        'input': '$race.results',
                        'initialValue': {
                            'sum': {
                                '$add': [
                                    '$race.fastestLap.points', '$race.pole.points', '$race.lastPlace.points', '$race.firstRetirement.points', 0
                                ]
                            }
                        },
                        'in': {
                            'sum': {
                                '$add': [
                                    '$$value.sum', '$$this.points'
                                ]
                            }
                        }
                    }
                },
                'bonus': {
                    '$reduce': {
                        'input': '$race.bonus',
                        'initialValue': {
                            'sum': 0
                        },
                        'in': {
                            'sum': {
                                '$add': [
                                    '$$value.sum', '$$this.points'
                                ]
                            }
                        }
                    }
                }
            }
        }, {
            '$project': {
                'user': {
                    '$concat': [
                        {
                            '$arrayElemAt': [
                                '$user.firstName', 0
                            ]
                        }, ' ', {
                            '$arrayElemAt': [
                                '$user.lastName', 0
                            ]
                        }
                    ]
                },
                '_id': '$userId',
                'raceResults': '$raceResults.sum',
                'bonus': '$bonus.sum',
                'joker': '$jokerDriver.points',
                'penalty': '$penalty',
                'totalPoints': {
                    '$add': [
                        '$raceResults.sum', '$bonus.sum', '$jokerDriver.points', '$penalty'
                    ]
                }
            }
        }, {
            '$sort': {
                'totalPoints': -1
            }
        }
    ];
    return pipeline;
}
exports.getRaceStandingsPipeline = getRaceStandingsPipeline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3MuZHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcGlja3MvcGlja3MuZHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQWNjLFFBQUEsb0JBQW9CLEdBQ2xDO0lBQ0k7UUFDRSxZQUFZLEVBQUU7WUFDWixXQUFXLEVBQUU7Z0JBQ1gsYUFBYSxFQUFFLFNBQVM7YUFDekI7U0FDRjtLQUNGLEVBQUU7UUFDRCxTQUFTLEVBQUU7WUFDVCxNQUFNLEVBQUUsT0FBTztZQUNmLFlBQVksRUFBRSxXQUFXO1lBQ3pCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLElBQUksRUFBRSxNQUFNO1NBQ2I7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsS0FBSyxFQUFFLFNBQVM7WUFDaEIsYUFBYSxFQUFFO2dCQUNiLE1BQU0sRUFBRSxhQUFhO2FBQ3RCO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxPQUFPO2FBQ2xCO1NBQ0Y7S0FDRixFQUFFO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsYUFBYSxFQUFFLENBQUMsQ0FBQztTQUNsQjtLQUNGLEVBQUU7UUFDRCxVQUFVLEVBQUU7WUFDVixNQUFNLEVBQUU7Z0JBQ04sU0FBUyxFQUFFO29CQUNUO3dCQUNFLGNBQWMsRUFBRTs0QkFDZCxpQkFBaUIsRUFBRSxDQUFDO3lCQUNyQjtxQkFDRixFQUFFLEdBQUcsRUFBRTt3QkFDTixjQUFjLEVBQUU7NEJBQ2QsZ0JBQWdCLEVBQUUsQ0FBQzt5QkFDcEI7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUNELGFBQWEsRUFBRSxjQUFjO1NBQzlCO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsU0FBZ0Isb0JBQW9CLENBQUMsTUFBYztJQUNqRCxNQUFNLFFBQVEsR0FBbUI7UUFDN0I7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osV0FBVyxFQUFFO29CQUNYLGFBQWEsRUFBRSxTQUFTO2lCQUN6QjthQUNGO1NBQ0YsRUFBRTtZQUNELFNBQVMsRUFBRTtnQkFDVCxNQUFNLEVB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
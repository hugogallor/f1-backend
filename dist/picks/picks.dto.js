"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCumulativePointsPipeline = exports.getRaceStandingsPipeline = exports.getBreakdownPipeline = exports.standingsAggregation = void 0;
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
                        '$ifNull': [
                            {
                                '$arrayElemAt': [
                                    '$user.firstName', 0
                                ]
                            }, ''
                        ]
                    }, ' ', {
                        '$ifNull': [
                            {
                                '$arrayElemAt': [
                                    '$user.lastName', 0
                                ]
                            }, ''
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
function getCumulativePointsPipeline() {
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
            '$sort': {
                'race.race_id': 1
            }
        }, {
            '$setWindowFields': {
                'partitionBy': '$userId',
                'sortBy': {
                    'race.race_id': 1
                },
                'output': {
                    'cumulative': {
                        '$sum': '$userPoints',
                        'window': {
                            'documents': [
                                'unbounded', 'current'
                            ]
                        }
                    }
                }
            }
        }, {
            '$project': {
                'raceID': '$race.race_id',
                'race': '$race.name',
                'userPoints': 1,
                'cumulative': 1,
                'userId': '$userId',
                'user': {
                    '$concat': [
                        {
                            '$ifNull': [
                                {
                                    '$arrayElemAt': [
                                        '$user.firstName', 0
                                    ]
                                }, ''
                            ]
                        }, ' ', {
                            '$ifNull': [
                                {
                                    '$arrayElemAt': [
                                        '$user.lastName', 0
                                    ]
                                }, ''
                            ]
                        }
                    ]
                }
            }
        }, {
            '$group': {
                '_id': '$raceID',
                'race': {
                    '$first': '$race'
                },
                'data': {
                    '$push': {
                        'user': '$user',
                        'userId': '$userId',
                        'userPoints': '$userPoints',
                        'cumulative': '$cumulative'
                    }
                }
            }
        }, {
            '$sort': {
                '_id': 1
            }
        }
    ];
    return pipeline;
}
exports.getCumulativePointsPipeline = getCumulativePointsPipeline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3MuZHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcGlja3MvcGlja3MuZHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQWNjLFFBQUEsb0JBQW9CLEdBQ2xDO0lBQ0k7UUFDRSxZQUFZLEVBQUU7WUFDWixXQUFXLEVBQUU7Z0JBQ1gsYUFBYSxFQUFFLFNBQVM7YUFDekI7U0FDRjtLQUNGLEVBQUU7UUFDRCxTQUFTLEVBQUU7WUFDVCxNQUFNLEVBQUUsT0FBTztZQUNmLFlBQVksRUFBRSxXQUFXO1lBQ3pCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLElBQUksRUFBRSxNQUFNO1NBQ2I7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsS0FBSyxFQUFFLFNBQVM7WUFDaEIsYUFBYSxFQUFFO2dCQUNiLE1BQU0sRUFBRSxhQUFhO2FBQ3RCO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxPQUFPO2FBQ2xCO1NBQ0Y7S0FDRixFQUFFO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsYUFBYSxFQUFFLENBQUMsQ0FBQztTQUNsQjtLQUNGLEVBQUU7UUFDRCxVQUFVLEVBQUU7WUFDVixNQUFNLEVBQUU7Z0JBQ04sU0FBUyxFQUFFO29CQUNUO3dCQUNFLFNBQVMsRUFBRTs0QkFDVDtnQ0FDRSxjQUFjLEVBQUU7b0NBQ2QsaUJBQWlCLEVBQUUsQ0FBQztpQ0FDckI7NkJBQ0YsRUFBRSxFQUFFO3lCQUNOO3FCQUNGLEVBQUUsR0FBRyxFQUFFO3dCQUNOLFNBQVMsRUFBRTs0QkFDVDtnQ0FDRSxjQUFjLEVBQUU7b0NBQ2QsZ0JBQWdCLEVBQUUsQ0FBQztpQ0FDcEI7NkJBQ0YsRUFBRSxFQUFFO3lCQUNOO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRCxhQUFhLEVBQUUsY0FBYztTQUM5QjtLQUNGO0NBQ0YsQ0FBQztBQUVGLFNBQWdCLG9CQUFvQixDQUFDLE1BQWM7SUFDakQsTUFBTSxRQUFRLEdBQW1CO1FBQzdCO1lBQ0UsWUFBWSxFQUFF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
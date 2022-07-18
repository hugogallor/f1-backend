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
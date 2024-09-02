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
        '$addFields': {
            'totalPoints': {
                '$add': {
                    '$add': [
                        '$totalPoints', {
                            '$arrayElemAt': [
                                '$user.championPoints', 0
                            ]
                        }
                    ]
                }
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
            'championPoints': {
                '$arrayElemAt': [
                    '$user.championPoints', 0
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
                                    '$race.fastestLap.points', '$race.pole.points', '$race.lastPlace.points', '$race.firstRetirement.points', '$race.topTeam.points', 0
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
                'raceJoker': {
                    '$ifNull': [
                        '$race.raceJoker.points',
                        0
                    ]
                },
                'penalty': '$penalty',
                'total': {
                    '$add': [
                        '$raceResults.sum', '$bonus.sum', '$jokerDriver.points', { '$ifNull': [
                                '$race.raceJoker.points',
                                0
                            ]
                        }, '$penalty'
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
                                    '$race.fastestLap.points', '$race.pole.points', '$race.lastPlace.points', '$race.firstRetirement.points', '$race.topTeam.points', 0
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
                'raceJoker': { '$ifNull': ['$race.raceJoker.points', 0] },
                'penalty': '$penalty',
                'totalPoints': {
                    '$add': [
                        '$raceResults.sum', '$bonus.sum', '$jokerDriver.points', '$penalty', { '$ifNull': ['$race.raceJoker.points', 0] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3MuZHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcGlja3MvcGlja3MuZHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQWNjLFFBQUEsb0JBQW9CLEdBQ2pDO0lBQ0M7UUFDRSxZQUFZLEVBQUU7WUFDWixXQUFXLEVBQUU7Z0JBQ1gsYUFBYSxFQUFFLFNBQVM7YUFDekI7U0FDRjtLQUNGLEVBQUU7UUFDRCxTQUFTLEVBQUU7WUFDVCxNQUFNLEVBQUUsT0FBTztZQUNmLFlBQVksRUFBRSxXQUFXO1lBQ3pCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLElBQUksRUFBRSxNQUFNO1NBQ2I7S0FDRixFQUFFO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsS0FBSyxFQUFFLFNBQVM7WUFDaEIsYUFBYSxFQUFFO2dCQUNiLE1BQU0sRUFBRSxhQUFhO2FBQ3RCO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLFFBQVEsRUFBRSxPQUFPO2FBQ2xCO1NBQ0Y7S0FDRixFQUFFO1FBQ0QsWUFBWSxFQUFFO1lBQ1osYUFBYSxFQUFFO2dCQUNiLE1BQU0sRUFBRTtvQkFDTixNQUFNLEVBQUU7d0JBQ04sY0FBYyxFQUFFOzRCQUNkLGNBQWMsRUFBRTtnQ0FDZCxzQkFBc0IsRUFBRSxDQUFDOzZCQUMxQjt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7S0FDRixFQUFFO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsYUFBYSxFQUFFLENBQUMsQ0FBQztTQUNsQjtLQUNGLEVBQUU7UUFDRCxVQUFVLEVBQUU7WUFDVixNQUFNLEVBQUU7Z0JBQ04sU0FBUyxFQUFFO29CQUNUO3dCQUNFLFNBQVMsRUFBRTs0QkFDVDtnQ0FDRSxjQUFjLEVBQUU7b0NBQ2QsaUJBQWlCLEVBQUUsQ0FBQztpQ0FDckI7NkJBQ0YsRUFBRSxFQUFFO3lCQUNOO3FCQUNGLEVBQUUsR0FBRyxFQUFFO3dCQUNOLFNBQVMsRUFBRTs0QkFDVDtnQ0FDRSxjQUFjLEVBQUU7b0NBQ2QsZ0JBQWdCLEVBQUUs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
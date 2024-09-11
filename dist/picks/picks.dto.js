"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standingsAggregation = void 0;
exports.getBreakdownPipeline = getBreakdownPipeline;
exports.getRaceStandingsPipeline = getRaceStandingsPipeline;
exports.getCumulativePointsPipeline = getCumulativePointsPipeline;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3MuZHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcGlja3MvcGlja3MuZHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQTBGRSxvREEyR0M7QUFHRCw0REFvR0M7QUFFRCxrRUF1RkM7QUF2WFcsUUFBQSxvQkFBb0IsR0FDakM7SUFDQztRQUNFLFlBQVksRUFBRTtZQUNaLFdBQVcsRUFBRTtnQkFDWCxhQUFhLEVBQUUsU0FBUzthQUN6QjtTQUNGO0tBQ0YsRUFBRTtRQUNELFNBQVMsRUFBRTtZQUNULE1BQU0sRUFBRSxPQUFPO1lBQ2YsWUFBWSxFQUFFLFdBQVc7WUFDekIsY0FBYyxFQUFFLEtBQUs7WUFDckIsSUFBSSxFQUFFLE1BQU07U0FDYjtLQUNGLEVBQUU7UUFDRCxRQUFRLEVBQUU7WUFDUixLQUFLLEVBQUUsU0FBUztZQUNoQixhQUFhLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLGFBQWE7YUFDdEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sUUFBUSxFQUFFLE9BQU87YUFDbEI7U0FDRjtLQUNGLEVBQUU7UUFDRCxZQUFZLEVBQUU7WUFDWixhQUFhLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFO29CQUNOLE1BQU0sRUFBRTt3QkFDTixjQUFjLEVBQUU7NEJBQ2QsY0FBYyxFQUFFO2dDQUNkLHNCQUFzQixFQUFFLENBQUM7NkJBQzFCO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtLQUNGLEVBQUU7UUFDRCxPQUFPLEVBQUU7WUFDUCxhQUFhLEVBQUUsQ0FBQyxDQUFDO1NBQ2xCO0tBQ0YsRUFBRTtRQUNELFVBQVUsRUFBRTtZQUNWLE1BQU0sRUFBRTtnQkFDTixTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsU0FBUyxFQUFFOzRCQUNUO2dDQUNFLGNBQWMsRUFBRTtvQ0FDZCxpQkFBaUIsRUFBRSxDQUFDO2lDQUNyQjs2QkFDRixFQUFFLEVBQUU7eUJBQ047cUJBQ0YsRUFBRSxHQUFHLEVBQUU7d0JBQ04sU0FBUyxFQUFFOzRC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
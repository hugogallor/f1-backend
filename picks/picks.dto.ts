import {driver, team, bonusQuestion, race} from '../f1info/f1info.dto';
import { PipelineStage } from 'mongoose';
import mongoose from 'mongoose';

export interface userPicks {
    userId: string,
    race: race,
    userPoints: number,
    jokerDriver: driver,
    penalty: number,
    
    }
    

 export const standingsAggregation:PipelineStage[] =
 [
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

  export function getBreakdownPipeline(userId: string){
    const pipeline:PipelineStage[] = [
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
            'raceJoker':{
              '$ifNull': [
                '$race.raceJoker.points',
                0
              ]
            } ,
            'penalty': '$penalty', 
            'total': {
              '$add': [
                '$raceResults.sum', '$bonus.sum', '$jokerDriver.points', {'$ifNull': [
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
  

  export function getRaceStandingsPipeline(raceId: string){
    const raceIdInt: number = parseInt(raceId);
    const pipeline:PipelineStage[] =  
    [
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
                    '$race.fastestLap.points', '$race.pole.points', '$race.lastPlace.points', '$race.firstRetirement.points','$race.topTeam.points', 0
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
          'raceJoker': '$race.raceJoker.points',
          'penalty': '$penalty', 
          'totalPoints': {
            '$add': [
              '$raceResults.sum', '$bonus.sum', '$jokerDriver.points', {'$ifNull': [
                '$race.raceJoker.points',
                0
              ]
            }, '$penalty'
            ]
          }
        }
      }, {
        '$sort': {
          'totalPoints': -1
        }
      }
    ]
  return pipeline;
  }

  export function getCumulativePointsPipeline(){
    const pipeline:PipelineStage[] =  [
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
    ]
    return pipeline;
  }

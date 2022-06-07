module.exports = {
  constructorArgs: {
    version: 3,
  },

  apiDoc: {
    configapi: '3.0.0',
    info: {
      version: '1.0.0',
      description: 'Some config description',
      title: 'Title',
      type: 'ad',
      contact: {
        name: 'name',
        email: 'email',
      },
      license: {
        name: 'MIT',
      },
    },
    content: {
      schema : {
        "ads": {
          $ref: '#/components/schemas/Ads',
        },
        required: ['ads'],
      }
    },
    components: {
      schemas: {
        Ads: {
          required: [
            'bannerAdUnit',
            'interstitialAdUnit',
            'rewardedAdUnit',
            'log',
            'delayInterstitialInterstitial',
            'delayRewardedInterstitial',
            'isCreativeDebuggerEnabled',
            'isShowMediationDebugger',
          ],
          properties: {
            bannerAdUnit: {
              type: 'string',
              example: 'c1de17789539fe68',
            },
            interstitialAdUnit: {
              type: "string",
              example: "de52505b388c73d9",
            },
            rewardedAdUnit: {
              type: "string",
              example: "159bcdb837df30dc",
            },
            log: {
              type: 'integer',
              enum: [0, 1],
            },
            delayInterstitialInterstitial: {
              type: 'integer',
              example: 30,
            },
            delayRewardedInterstitial: {
              type: 'integer',
              example: 1,
            },
            isCreativeDebuggerEnabled: {
              type: 'integer',
              enum: [0, 1],
            },
            isShowMediationDebugger: {
              type: 'integer',
              enum: [0, 1],
            },
            banner : {
              $ref: '#/components/schemas/BannerInterReward'
            },
            interstitial: {
              $ref: '#/components/schemas/BannerInterReward'
            },
            rewarded: {
              $ref: '#/components/schemas/BannerInterReward'
            },
            settings: {
              $ref: '#/components/schemas/Settings'
            }
          },
        },
        BannerInterReward: {
          type: 'object',
          properties: {
            bidders: {
              type: "array",
              items: {
                $ref: '#/components/schemas/Bidder'
              },
            },
            waterfallsDelays: {
              type: "array",
              items: {
                type: "integer",
                example: 30,
              }
            },
            delayLongwaterfall: {
              type: "integer",
              example: 30
            }
          }
        },
        Bidder: {
          type: 'object',
          required: ['name', 'params'],
          properties: {
            name: {
              type: "string",
              example: 'amazon',
            },
            params: {
              $ref: '#/components/schemas/Bidder'
            },
          }
        },
        BidderParams: {
          type: 'object',
          required: [
            'appKey',
            'slotUUID',
            'isTest',
            'limitRequest',
          ],
          properties: {
            appKey: {
              type: "string",
              example: '8d5d66458587426aae9ac27e84f49718',
            },
            slotUUID: {
              type: "string",
              example: 'd055bef4-8671-4e6c-8e52-d710e6ecef3b',
            },
            isTest: {
              type: "integer",
              enum: [0, 1],
            },
            limitRequest: {
              type: "integer",
              example: 15,
            },
          }
        },
        Settings: {
          type: 'object',
          required: ['isBannerAdaptive'],
          properties: {
            isBannerAdaptive: {
              type: 'integer',
              enum: [0, 1],
            }
          }
        }
      },
    },
  },

  errors: [],
};

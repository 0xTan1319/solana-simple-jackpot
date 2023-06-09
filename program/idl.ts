export type Solbox = {
  "version": "0.1.0",
  "name": "solbox",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "changeAdmin",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateFee",
      "docs": [
        "* Update loyalty fee\n     * only admin can change them"
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bet",
          "type": "u64"
        },
        {
          "name": "loyaltyFee",
          "type": "u16"
        },
        {
          "name": "chance",
          "type": "u16"
        }
      ]
    },
    {
      "name": "addTeamTreasury",
      "docs": [
        "* Add team treasury account\n     *\n     * @param - global pda bump\n     *          treasury address\n     *          distribution rate by permyriad"
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        },
        {
          "name": "rate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "removeTeamTreasury",
      "docs": [
        "* Remove team treasury account\n     *\n     * @param - global pda bump\n     *          treasury address"
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "openBox",
      "docs": [
        "* Opens box with Sol\n     * @param bet - bet amount to open the box"
      ],
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimReward",
      "docs": [
        "* The claim Reward function after played several times"
      ],
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "playerVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdraw",
      "docs": [
        "* Withdraw function to withdraw SOL from PDA\n     * @param - sol_amount: The sol amount to withdraw\n     * @dev Only Admin can withdraw SOL from this PDA"
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "superAdmin",
            "type": "publicKey"
          },
          {
            "name": "bet",
            "type": "u64"
          },
          {
            "name": "chance",
            "type": "u16"
          },
          {
            "name": "loyaltyFee",
            "type": "u16"
          },
          {
            "name": "teamCount",
            "type": "u8"
          },
          {
            "name": "teamTreasury",
            "type": {
              "array": [
                "publicKey",
                8
              ]
            }
          },
          {
            "name": "treasuryRate",
            "type": {
              "array": [
                "u16",
                8
              ]
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAdmin",
      "msg": "Invalid Admin"
    },
    {
      "code": 6001,
      "name": "FeePercentTooBig",
      "msg": "Fee percent should be <= 1000"
    },
    {
      "code": 6002,
      "name": "MaxTeamCountExceed",
      "msg": "Number of team account should be <= 8"
    },
    {
      "code": 6003,
      "name": "TreasuryAddressExist",
      "msg": "Treasury address already exist in the team list"
    },
    {
      "code": 6004,
      "name": "NoTreasuryAddress",
      "msg": "Treasury address is not exist in the team list"
    },
    {
      "code": 6005,
      "name": "TeamTreasuryCountMismatch",
      "msg": "Treasury address count mismatch"
    },
    {
      "code": 6006,
      "name": "TeamTreasuryAddressMismatch",
      "msg": "Treasury address mismatch"
    },
    {
      "code": 6007,
      "name": "InsufficientUserBalance",
      "msg": "User balance should be greater than bet amount"
    },
    {
      "code": 6008,
      "name": "NothingToClaim",
      "msg": "No lamports to claim"
    }
  ]
};

export const IDL: Solbox = {
  "version": "0.1.0",
  "name": "solbox",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "changeAdmin",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateFee",
      "docs": [
        "* Update loyalty fee\n     * only admin can change them"
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bet",
          "type": "u64"
        },
        {
          "name": "loyaltyFee",
          "type": "u16"
        },
        {
          "name": "chance",
          "type": "u16"
        }
      ]
    },
    {
      "name": "addTeamTreasury",
      "docs": [
        "* Add team treasury account\n     *\n     * @param - global pda bump\n     *          treasury address\n     *          distribution rate by permyriad"
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        },
        {
          "name": "rate",
          "type": "u16"
        }
      ]
    },
    {
      "name": "removeTeamTreasury",
      "docs": [
        "* Remove team treasury account\n     *\n     * @param - global pda bump\n     *          treasury address"
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "openBox",
      "docs": [
        "* Opens box with Sol\n     * @param bet - bet amount to open the box"
      ],
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimReward",
      "docs": [
        "* The claim Reward function after played several times"
      ],
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "playerVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdraw",
      "docs": [
        "* Withdraw function to withdraw SOL from PDA\n     * @param - sol_amount: The sol amount to withdraw\n     * @dev Only Admin can withdraw SOL from this PDA"
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "superAdmin",
            "type": "publicKey"
          },
          {
            "name": "bet",
            "type": "u64"
          },
          {
            "name": "chance",
            "type": "u16"
          },
          {
            "name": "loyaltyFee",
            "type": "u16"
          },
          {
            "name": "teamCount",
            "type": "u8"
          },
          {
            "name": "teamTreasury",
            "type": {
              "array": [
                "publicKey",
                8
              ]
            }
          },
          {
            "name": "treasuryRate",
            "type": {
              "array": [
                "u16",
                8
              ]
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAdmin",
      "msg": "Invalid Admin"
    },
    {
      "code": 6001,
      "name": "FeePercentTooBig",
      "msg": "Fee percent should be <= 1000"
    },
    {
      "code": 6002,
      "name": "MaxTeamCountExceed",
      "msg": "Number of team account should be <= 8"
    },
    {
      "code": 6003,
      "name": "TreasuryAddressExist",
      "msg": "Treasury address already exist in the team list"
    },
    {
      "code": 6004,
      "name": "NoTreasuryAddress",
      "msg": "Treasury address is not exist in the team list"
    },
    {
      "code": 6005,
      "name": "TeamTreasuryCountMismatch",
      "msg": "Treasury address count mismatch"
    },
    {
      "code": 6006,
      "name": "TeamTreasuryAddressMismatch",
      "msg": "Treasury address mismatch"
    },
    {
      "code": 6007,
      "name": "InsufficientUserBalance",
      "msg": "User balance should be greater than bet amount"
    },
    {
      "code": 6008,
      "name": "NothingToClaim",
      "msg": "No lamports to claim"
    }
  ]
};

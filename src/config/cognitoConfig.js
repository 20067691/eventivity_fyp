import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-1_NZqc27Yt8', 
  ClientId: '2617dljqu24q3r5vttdfnmpce9',  // example: 1234abcd5678efghijklmnop
};

export const userPool = new CognitoUserPool(poolData);

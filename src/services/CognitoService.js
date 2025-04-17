import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-1_NZqc27Yt8',
  ClientId: '2617dljqu24q3r5vttdfnmpce9',
};

const userPool = new CognitoUserPool(poolData);

export async function signUp(username, password, attributes) {
  return new Promise((resolve, reject) => {
    const attributeList = [];

    if (attributes && attributes.email) {
      const emailAttribute = new CognitoUserAttribute({
        Name: 'email',
        Value: attributes.email,
      });
      attributeList.push(emailAttribute);
    }

    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function confirmUser(username, code) {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: username,
        Pool: userPool,
      };
  
      const cognitoUser = new CognitoUser(userData);
  
      cognitoUser.confirmRegistration(code, true, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  


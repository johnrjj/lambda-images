import { verify } from 'jsonwebtoken';
import { SES, Config, IAM } from 'aws-sdk';
import { Context, Callback } from 'aws-lambda';

const AUTH0_CLIENT_ID = '';
const AUTH0_CLIENT_SECRET = '';

const generatePolicy = (principalId, effect, resource) => {
  const authResponse: any = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument: any = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne: any = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  authResponse.context = {};
  authResponse.context.stringKey = "stringval";
  authResponse.context.numberKey = 123;
  authResponse.context.booleanKey = true;

  return authResponse;
};

const auth = (event: any, context: Context, cb: Callback) => {

  if (event.authorizationToken) {
    if (event.authorizationToken === 'allow') {
      return cb(null, generatePolicy('user', 'Allow', event.methodArn));
    }
    
    cb(null, generatePolicy('user', 'Deny', event.methodArn));

    // // remove "bearer " from token
    // const token: string = event.authorizationToken.substring(7);
    // const options = {
    //   audience: AUTH0_CLIENT_ID,
    // };
    // verify(token, new Buffer(AUTH0_CLIENT_SECRET, 'base64'), options, (err, decoded) => {
    //   if (err) {
    //     cb(Error('Unauthorized'));
    //   } else {
    //     cb(null, generatePolicy(decoded.sub, 'Allow', event.methodArn));
    //   }
    // });
  } else {
    cb(Error('Unauthorized'));
  }
}

export {
  auth,
};
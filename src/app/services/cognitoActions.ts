import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
  CognitoIdentityProviderClientConfig,
  ListUsersCommand
} from '@aws-sdk/client-cognito-identity-provider';

console.log('keyId: ', process.env._AWS_ACCESS_KEY_ID);

const config = {
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
} as CognitoIdentityProviderClientConfig;
const client = new CognitoIdentityProviderClient(config);

export const createCognitoUser = async (
  email: string,
  name: string,
  role: string,
  password: string
) => {
  try {
    const command = new AdminCreateUserCommand({
      UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
      Username: email,
      UserAttributes: [
        {
          Name: 'username',
          Value: email
        },
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'name',
          Value: name,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
        {
          Name: 'custom:role',
          Value: role,
        }
      ],
    });
    const response = await client.send(command);

    const setPasswordCommand = new AdminSetUserPasswordCommand({
      UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
      Username: email,
      Password: password,
      Permanent: true,
    });
    await client.send(setPasswordCommand);

    const groupCommand = new AdminAddUserToGroupCommand({
      UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
      Username: email,
      GroupName: role,
    });
    await client.send(groupCommand);
  } catch (error) {
    console.log('error creating user: ', error);
  }
}

export const getUsers = async () => {
  const command = new ListUsersCommand({
    UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
  });
  return await client.send(command);
}

export const deleteUser = async (username: string) => {
  const command = new AdminDeleteUserCommand({
    UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    Username: username,
  });
  const response = await client.send(command);
  return response;
}

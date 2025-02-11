import {authConfig} from "@/utils/aws/Amplify";
import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});


export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        if (!session.tokens) {
          return;
        }
        const user = {
          ...(await getCurrentUser(contextSpec)),
          isAdmin: false,
          accessToken: "",
        };
        const groups = session.tokens.accessToken.payload["cognito:groups"];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        user.isAdmin = Boolean(groups && groups.includes("ADMIN"));
        user.accessToken = session.tokens.accessToken.toString();

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  });
}

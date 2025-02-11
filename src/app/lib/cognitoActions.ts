import {redirect, useRouter} from "next/navigation";
import {
  signIn,
  signOut,
} from "aws-amplify/auth";
import {getErrorMessage} from "@/utils/get-error-message";

export async function handleSignIn(
  email: string,
  password: string
) {

  const redirectLink = "/dashboard";
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password: password,
    })
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    return getErrorMessage(error);
  }
}


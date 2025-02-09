import { redirect } from "next/navigation";
import {
  signIn,
  signOut,
} from "aws-amplify/auth";

export async function handleSignIn(
  email: string,
  password: string
) {
  const redirectLink = "/companies";
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password: password,
    })
    // TODO: handle nextStep to confirm sign in and add MFA
  } catch (error) {
    console.log("error signing in", error);
    redirect("/login");
  }
  redirect(redirectLink);
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
  redirect("/login");
}

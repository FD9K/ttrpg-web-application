import { auth } from "./config";

type AuthenticationOptions = {
  email: string;
  password: string;
}

export async function login(method: string, options: AuthenticationOptions): Promise<any> {
  switch (method) {
    case "email":
      try {
        const { email, password } = options;
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const { user } = userCredential;
        return user;
      } catch (error) {
        return error;
      }
    default:
      return "not supported."
  }
}

export async function logout() {
  try {
    console.log("made it this far, right?");
    await auth.signOut();
  } catch (error) {
    console.log("an error occurred while signing out: ", error);
  }
}

export async function register(method: string, options: AuthenticationOptions): Promise<any> {
  switch (method) {
    case "email": 
      try {
        const { email, password } = options;
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const { user } = userCredential;
        return user;
      } catch (error) {
        return error;
      }
    default:
      return "not supported";
  }
}
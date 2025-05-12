
import { supabase } from "@/lib/supabaseClient";

export async function signUp(email: string, password: string) {
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) {
      // failed at the auth step
      return { data, error: signUpError };
    }

  const user = data.user;
  
  if (!user) {
    // this should almost never happen, but guard anyway 
    return {
      data,
      error: { message: "No user returned after signUp.", status: 500 },
    };
  }

  // 2) insert into public.user
  const { error: insertError } = await supabase
    .from("user")
    .insert({
      UID: user.id,
    });

  if (insertError) {
    // If the insert fails, we surface that error
    return {
      data,
      error: insertError,
    };
  }

  return { data, error: null };
}

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signInWithGoogle() {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}

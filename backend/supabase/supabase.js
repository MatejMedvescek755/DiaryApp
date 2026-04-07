import { createClient } from "@supabase/supabase-js";

console.log(process.env.SUPABASE_URL);

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY,
);

export const signInWithEmail = async (email) => {
  const { error, data } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.FRONTEND_URL}/entry`,
    },
  });
  if (error) {
    throw new Error(error);
  }
  return data;
};

export const addUserToSupabase = async (data) => {
  var datetime = new Date().toISOString();
  console.log(data);
  const userData = {
    email: email,
    id: data.user.id,
    username: email.split("@")[0],
    created_at: datetime,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  console.log(userData);
  const { error } = await supabase.from("Users").insert(userData);

  if (error) {
    throw new Error(JSON.stringify(error));
  }
};

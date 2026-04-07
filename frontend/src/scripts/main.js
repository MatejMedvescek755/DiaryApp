const URL = "http://localhost:3000";

export const postData = async (string) => {
  console.log(string);
  const date = new Date();
  const file_name = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}.txt`;
  //const file_name = "test.txt";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: string, file_name: file_name }),
  });
  console.log(response);
};

export const signUp = async (email) => {
  const response = await fetch(`${URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  console.log(response);
};

export const deleteFile = async (fileName) => {
  console.log(fileName);
  const response = await fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ file_name: fileName }),
  });
  console.log(response);
};

export const getFiles = async () => {
  const fields = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return fields.json();
};

export const getFile = async (file_name) => {
  const data = await fetch(`${URL}/${file_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const text = data.text();
  return text;
};

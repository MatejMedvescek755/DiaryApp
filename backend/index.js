const fsp = require("fs").promises;
const fs = require("fs");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  signInWithEmail,
  addUserToSupabase,
  supabase,
} = require("./supabase/supabase");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  const data = req.body;
  try {
    await writeNewFile(data.text, data.file_name);
    res.send("success");
  } catch (err) {
    res.status(500).send("error creating file");
  }
});

app.post("/auth/signup", async (req, res) => {
  const { email } = req.body;

  console.log("Email:", email);

  try {
    const data = await signInWithEmail(email);

    return res.status(200).json({
      success: true,
      message: "Magic link sent successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});

app.get("/:file", async (req, res) => {
  try {
    console.log(req.params.file);
    const file = await fsp.readFile(`./entries/${req.params.file}`, "utf-8");
    res.send(file);
  } catch (error) {
    console.error(error);
  }
});

app.get("/", async (req, res) => {
  const files = await getAllFiles();
  if (files) {
    res.send(JSON.stringify(files));
  } else {
    res.send("something went wrong");
  }
});

app.listen(3000);

app.get("/auth/verify", async (req, res) => {
  const { access_token } = req.body;
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(access_token);

    if (error || !user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    addUserToSupabase(data);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/", async (req, res) => {
  try {
    const data = req.body;
    await fsp.unlink(`./entries/${data.file_name}`);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
  }
});

const getAllFiles = async () => {
  try {
    if (!fs.existsSync("./entries")) {
      fs.mkdirSync("./entries");
    }
    const files = await fsp.readdir("./entries");
    return files.reverse();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const writeNewFile = async (content, fileName) => {
  try {
    await fsp.writeFile(`./entries/${fileName}`, content);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

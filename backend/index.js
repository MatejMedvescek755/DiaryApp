const fs = require("fs").promises;
const express = require("express");
const cors = require("cors");
const { error } = require("console");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  const data = req.body;
  console.log("test: ", data);
  try {
    await writeNewFile(data.text, data.file_name);
    res.send("success");
  } catch (err) {
    res.status(500).send("error creating file");
  }
});

app.get("/:file", async (req, res) => {
  try {
    console.log(req.params.file);
    const file = await fs.readFile(`./entries/${req.params.file}`, "utf-8");
    console.log(file);
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

app.delete("/", (req, res) => {
  const data = req.body;
  fs.unlink(`./entries/${data.file_name}`, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File not found or cannot delete" });
    }

    res.json({ message: "File deleted successfully" });
  });
});

const getAllFiles = async () => {
  try {
    const files = await fs.readdir("./entries");
    return files.reverse();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const writeNewFile = async (content, fileName) => {
  try {
    await fs.writeFile(`./entries/${fileName}`, content);
    console.log("test2: ", fileName);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

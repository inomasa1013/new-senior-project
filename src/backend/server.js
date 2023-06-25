const express = require("express");
const app = express();
const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile.js")[environment];
const knex = require("knex")(config);
require("dotenv").config();
// require("dotenv")は、.envファイルの内容を読み込むためのNode.jsモジュールであり、config()メソッドを呼び出すことで.envファイルの内容を環境変数に設定

const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

// GET 県別いいね数取得
app.get("/api/favorites", async (req, res) => {
  await knex("FAVORITE")
    .select()
    .then((favorites) => {
      const result = [];
      const countMap = new Map();
      // 県ごとにヒット数をカウント
      for (const favorite of favorites) {
        if (countMap.has(favorite.prefecture)) {
          countMap.set(prefecture, countMap.get(prefecture) + 1);
        } else {
          countMap.set(prefecture, 1);
        }
      }
      // 県ごとに{prefecture, number}の形でカウント結果をプッシュ
      for (const [prefecture, number] of countMap.entries()) {
        result.push({ prefecture, number });
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// GET 県別のいいね一覧
app.get("/api/favorites/:prefecture", async (req, res) => {
  const prefecture = req.params.prefecture;
  await knex("FAVORITE")
    .select("id", "title", "images", "price", "access")
    .where({ prefecture: prefecture })
    .then((favorites) => {
      res.status(200).json(favorites);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// POST ログイン
app.post("/api/login", async (req, res) => {
  const { name, password } = req.body;

  const db = await knex.select("*").from("USER").where;
  knex("USER")
    .select()
    .where({ name, password })
    .first()
    .then((user) => {
      if (user) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// POST USER追加
app.post("/api/users", (req, res) => {
  const { name, email, password } = req.body;

  knex("USER")
    .insert({ name, email, password })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// POST FAVOTITE追加
app.post("/api/favorites", (req, res) => {

  knex("FAVORITE").insert(req.body)
  // knex("FAVORITE").del().where({ title: req.body.title })
    .then(() => {
      res.set("content-type", "application/json")
         .status(200)
         .send(req.body);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  knex("users")
    .where({ id })
    .update({ name, email })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  knex("users")
    .where({ id })
    .del()
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

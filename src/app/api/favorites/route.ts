import { Prefecture } from '@/globals';
import { NextRequest, NextResponse } from 'next/server';
import knex from '../../../knex.js';
require('dotenv').config({ path: '@/.env' });

// ダミーデータ。
const prefectures: Prefecture[] = [
  {
    name: '愛知県',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Nagoya_Castle_7.jpg',
    number: 100,
  },
  {
    name: '東京都',
    imgSrc:
      'https://s3-ap-northeast-1.amazonaws.com/thegate/2020/12/24/17/47/58/kaminari_mon_main.jpg',
    number: 6,
  },
  {
    name: '北海道',
    imgSrc:
      'https://hokkaido-kanko-guide.com/wp-content/uploads/2022/07/990d1af0e5875bc162fb0d3e8aec6ef0-scaled.jpg',
    number: 3,
  },
  {
    name: '山形県',
    imgSrc:
      'https://travel.rakuten.co.jp/mytrip/sites/mytrip/files/styles/main_image/public/migration_article_images/ranking/spot-yamagata-key.jpg?itok=1TwxCvie',
    number: 1,
  },
  {
    name: '沖縄県',
    imgSrc:
      'https://www.his-j.com/kokunai/kanto/tour_info/okinawa/catchy/wp-content/uploads/2018/05/1%E4%B8%87%E5%BA%A7%E6%AF%9B.jpg',
    number: 1,
  },
];

// knexが使えず大苦戦。以下全部インストールしたら解決した。
// npm install better-sqlite3
// npm install tedious
// npm install mysql
// npm install mysql2
// npm install oracledb
// npm install pg-query-stream
// npm install sqlite3
// この後、npm installも実行して依存関係もインストールした。

export async function GET(req: NextRequest, res: NextResponse) {
  // FAVORITEテーブル取得
  const data = await knex('FAVORITE')
    .select()
    .catch((err: any) => {
      console.error(err);
      return NextResponse.json(err);
    });

  // レスポンスのためにデータ加工。{ name: "愛知県", imgSrc: "https~", number: 3 }
  // ロジック汚いので要リファクタリング。
  const result: Object[] = [];
  data.forEach((favorite: any) => {
    let flg = true;
    let elm: any = {};

    result.forEach((obj: any) => {
      if (obj.name === favorite.name) {
        flg = false;
      }
    });

    if (flg) {
      elm.name = favorite.prefecture;
      elm.imgSrc = favorite.images[0];

      let number = 0;
      data.forEach((object: any) => {
        if (favorite.name === object.name) {
          number++;
        }
      });
      elm.number = number;
    }
    result.push(elm);
  });
  return NextResponse.json(result);
}

// エラー出るが一応インサートできる。
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log('body', body);
  knex('FAVORITE')
    .insert(body)
    .then(() => {})
    .catch((err: any) => {
      console.error(err);
    });
  // return NextResponse.json(prefectures);
}

// // GET 県別いいね数取得
// app.get('/api/favorites', async (req, res) => {
//   await knex('FAVORITE')
//     .select()
//     .then((favorites) => {
//       const result = [];
//       const countMap = new Map();
//       // 県ごとにヒット数をカウント
//       for (const favorite of favorites) {
//         if (countMap.has(favorite.prefecture)) {
//           countMap.set(prefecture, countMap.get(prefecture) + 1);
//         } else {
//           countMap.set(prefecture, 1);
//         }
//       }
//       // 県ごとに{prefecture, number}の形でカウント結果をプッシュ
//       for (const [prefecture, number] of countMap.entries()) {
//         result.push({ prefecture, number });
//       }
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// // GET 県別のいいね一覧
// app.get('/api/favorites/:prefecture', async (req, res) => {
//   const prefecture = req.params.prefecture;
//   await knex('FAVORITE')
//     .select('id', 'title', 'images', 'price', 'access')
//     .where({ prefecture: prefecture })
//     .then((favorites) => {
//       res.status(200).json(favorites);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// // POST ログイン
// app.post('/api/login', async (req, res) => {
//   const { name, password } = req.body;

//   const db = await knex.select('*').from('USER').where;
//   knex('USER')
//     .select()
//     .where({ name, password })
//     .first()
//     .then((user) => {
//       if (user) {
//         res.json({ success: true });
//       } else {
//         res.json({ success: false });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ error: error.message });
//     });
// });

// // POST USER追加
// app.post('/api/users', (req, res) => {
//   const { name, email, password } = req.body;

//   knex('USER')
//     .insert({ name, email, password })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// // POST FAVOTITE追加
// app.post('/api/favorites', (req, res) => {
//   knex('FAVORITE')
//     .insert(req.body)
//     // knex("FAVORITE").del().where({ title: req.body.title })
//     .then(() => {
//       res.set('content-type', 'application/json').status(200).send(req.body);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// app.put('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, email } = req.body;

//   knex('users')
//     .where({ id })
//     .update({ name, email })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// app.delete('/api/users/:id', (req, res) => {
//   const { id } = req.params;

//   knex('users')
//     .where({ id })
//     .del()
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

import { NextRequest, NextResponse } from 'next/server';
import { useSearchParams } from 'next/navigation';
import knex from '../../../../knex.js';
require('dotenv').config({ path: '@/.env' });

// {
//   id: 1,
//   name: '香嵐渓',
//   imgSrc: 'https://www.tourismtoyota.jp/upload/rspots/large/10950727826278429f9021f.jpg',
//   price: 500,
//   access: '車',
// },

export async function GET(req: NextRequest, res: NextResponse) {
  // console.log(req.url);
  // やり方わからないので強引にパスパラメータ取得。
  const array = req.url.split('/');
  const prefecture = decodeURIComponent(array[array.length - 1]);
  // console.log(decodeURIComponent(prefecture));

  // FAVORITEテーブル取得
  const data = await knex('FAVORITE')
    .select()
    .where({ prefecture: prefecture })
    .catch((err: any) => {
      console.error(err);
      return NextResponse.json(err);
    });
  console.log('data', data);

  // レスポンスのためにデータ加工。
  // ロジック汚いので要リファクタリング。
  const result: Object[] = [];
  let count = 1;
  data.forEach((favorite: any) => {
    result.push({
      id: count,
      name: favorite.title,
      imgSrc: favorite.images[0],
      price: favorite.price,
      access: favorite.access,
    });
  });
  console.log(result);
  return NextResponse.json(result);
}

import { NextRequest, NextResponse } from 'next/server';
import knex from '../../../knex.js';
require('dotenv').config({ path: '@/.env' });

export async function GET(req: NextRequest, res: NextResponse) {
  const data = await knex('USER')
    .select()
    // 妥協のany。
    .catch((err: any) => {
      console.error(err);
    });
  return NextResponse.json(data);
}

// しっかりインサートされるけどエラーが起きる。
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  knex('USER')
    .insert(body)
    .then(() => {
      // return NextResponse.json(body);
    })
    .catch((err: any) => {
      // console.error(err);
      // return NextResponse.json(err);
    });
}

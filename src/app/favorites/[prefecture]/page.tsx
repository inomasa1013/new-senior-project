'use client';

import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import SERVER_URL from '@/serverfile';
import { Spot } from '@/globals';
import './page.css';
import Footer from '@/components/Footer';

export default function spot({ params }: { params: { prefecture: string } }): JSX.Element {
  // ページコンポーネントにasyncつけると動かんくなる…なんで？
  // export default async function spot({
  //   params,
  // }: {
  //   params: { prefecture: string };
  // }): Promise<JSX.Element> {
  const prefecture = decodeURIComponent(params.prefecture);

  const [spotData, setSpotData] = useState<any>([]);

  const dammyData: Spot[] = [
    {
      id: 1,
      name: '香嵐渓',
      imgSrc: 'https://www.tourismtoyota.jp/upload/rspots/large/10950727826278429f9021f.jpg',
      price: 500,
      access: '車',
    },
    {
      id: 6,
      name: '名古屋城',
      imgSrc:
        'https://cdn-news.asoview.com/production/note/05a9e06f-f4c9-4632-a1e5-94d55e4ab29a.jpeg',
      price: 0,
      access: '電車',
    },
    {
      id: 42,
      name: '刈谷ハイウェイオアシス',
      imgSrc: 'https://anniversarys-mag.jp/img/p/pixta_44462056_M.jpg?w=730',
      price: 0,
      access: '車',
    },
    {
      id: 78,
      name: 'ラグーナ蒲郡',
      imgSrc:
        'https://travel.rakuten.co.jp/mytrip/sites/mytrip/files/styles/1cal_image/public/2022-10/News-202210-laguna-01-2.jpg?itok=mHYN0LnN',
      price: 0,
      access: '車',
    },
    {
      id: 108,
      name: '犬山城下町',
      imgSrc: 'https://www.aichi-now.jp/upload/spot_images/13a8fa1f15248f16d149b3059f62be21.jpg',
      price: 0,
      access: '車',
    },
  ];

  useEffect(() => {
    async function fetchData<T>(): Promise<void> {
      // いいねスポットデータをfetch
      const res: T = await fetch(`${SERVER_URL}/api/favorites/${prefecture}`).then((res) =>
        // const res: T = await fetch(`http://localhost:3000/api/favorites/${prefecture}`).then((res) =>
        res.json()
      );
      console.log('res', res);
      setSpotData(res);
    }
    fetchData<Spot>();
    // setSpotData(dammyData);
  }, []);

  const spots: JSX.Element[] = [];

  spotData.forEach((dataObj: any) => {
    let spot = (
      <div className="spots__spot-wrapper" key={dataObj.id}>
        <div className="spots__image-wrapper">
          <img className="spots__photo" src={dataObj.imgSrc} alt="" />
        </div>
        <span className="spots__price">¥{dataObj.price}</span>
        <span className="spots__name">{dataObj.name}</span>
        <span className="spots__access">{dataObj.access}</span>
      </div>
    );
    spots.push(spot);
  });

  return (
    <React.Fragment>
      <header>
        <Link href="/favorites">
          <IoIosArrowBack className="spots__back-link" size="3rem" />
        </Link>
        <h1>{prefecture}</h1>
      </header>
      <main className="spots__main">
        <div className="spots__wrapper">{spots}</div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

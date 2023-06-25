'use client';

import { BiMaleFemale } from 'react-icons/bi';
import { RiArrowLeftSLine } from 'react-icons/ri';
import {
  PiAlarmLight,
  PiCarProfileLight,
  PiPhoneLight,
  PiTrainLight,
  PiMapPinLight,
  PiMoneyLight,
  PiInfoLight,
} from 'react-icons/pi';
import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from 'react-icons/hi2';
import { TbBrandProducthunt } from 'react-icons/tb';
import Link from 'next/link';
import { memo, useCallback } from 'react';

import './detail.css';
import MySwiper from '../MySwiper';
import { cards } from '@/data/cards';
import { Cards } from '@/globals';

const detail = memo(({ params }: { params: { detail: string } }): JSX.Element => {
  const index = parseInt(decodeURIComponent(params.detail));

  const localStorageControl = useCallback(() => {
    const savedCardList = localStorage.getItem('cardList');
    const restoredCardList = savedCardList ? JSON.parse(savedCardList) : null;
    if (!restoredCardList || JSON.stringify(restoredCardList) === JSON.stringify([])) {
      const filterArr = cards.filter((card) => card !== cards[index]);
      localStorage.setItem('cardList', JSON.stringify(filterArr));
    } else {
      const filterArr = restoredCardList.filter((card: Cards) => card !== restoredCardList[index]);
      localStorage.setItem('cardList', JSON.stringify(filterArr));
    }
  }, []);

  const handleClickDislike = useCallback((index: number) => {
    console.log('dislike', cards[index]);
    localStorageControl();
  }, []);

  const handleClickLike = useCallback(async (index: number) => {
    console.log('like', cards[index]);
    localStorageControl();

    const postObj: Cards = {
      ...cards[index],
    };
    postObj.images = JSON.stringify(postObj.images);
    postObj.publicTransport = JSON.stringify(postObj.publicTransport);
    postObj.car = JSON.stringify(postObj.car);

    const postData = await fetch(
      // "/api/favorites",
      // 'http://localhost:3001/api/favorites',
      'http://localhost:3000/api/favorites',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: 33, ...postObj }),
      }
    ).then((data) => data.json());
    console.log(postData);
  }, []);

  return (
    <div className="detail-page">
      <Link href="/select" legacyBehavior>
        <div className="detail-back-box">
          <RiArrowLeftSLine className="detail-back" />
        </div>
      </Link>

      <main>
        <div>
          {/* <img className="detail-card-photo" src={cards[index].image} alt={`${cards[index].title}の写真`} /> */}
          <MySwiper images={cards[index].images} className="detail-card-photo" />
        </div>
        <section className="detail-description">
          <h2 className="detail-description-title">{cards[index].title}</h2>
          <h3>
            <PiMapPinLight className="detail-icon" />
            所在地
          </h3>
          <div>
            <div className="post-code">{`〒${cards[index].postCode}`}</div>
            <p className="detail-address">
              <a href={`https://www.google.co.jp/maps/search/${cards[index].title}`}>
                {cards[index].address}
              </a>
            </p>
          </div>
          <h3>
            <PiMoneyLight className="detail-icon" />
            料金
          </h3>
          <p>{cards[index].price}</p>
          <h3>
            <PiAlarmLight className="detail-icon" />
            営業日・時間
          </h3>
          <p>{cards[index].business}</p>
          <h3>
            <PiPhoneLight className="detail-icon" />
            電話番号
          </h3>
          <p>{cards[index].phoneNumber}</p>
          <h3>
            <TbBrandProducthunt className="detail-icon" />
            駐車場
          </h3>
          <p>{cards[index].parking}</p>
          <h3>
            <BiMaleFemale className="detail-icon" />
            トイレ
          </h3>
          <p>{cards[index].toilet}</p>
          <h3>
            <PiInfoLight className="detail-icon" />
            定休日
          </h3>
          <p>{cards[index].closed}</p>
          <h3>
            <PiTrainLight className="detail-icon" />
            公共交通機関でのアクセス
          </h3>
          <div>
            <ul>
              {cards[index].publicTransport.map((root, index) => (
                <li key={index}>{root}</li>
              ))}
            </ul>
          </div>
          <h3>
            <PiCarProfileLight className="detail-icon" />
            車でのアクセス
          </h3>
          <div>
            <ul>
              {cards[index].car.map((root, index) => (
                <li key={index}>{root}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="detail-footer">
        <Link href="/select">
          <div className="detail-footer-dislike" onClick={() => handleClickDislike(index)}>
            <HiOutlineHandThumbDown className="detail-dislike" />
          </div>
        </Link>
        <Link href="/select">
          <div className="detail-footer-like" onClick={() => handleClickLike(index)}>
            <HiOutlineHandThumbUp className="detail-like" />
          </div>
        </Link>
      </footer>
    </div>
  );
});

export default detail;

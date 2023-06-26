import React, { Dispatch, SetStateAction, memo, useCallback } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from 'react-icons/hi2';
import { PiMapPinLight } from 'react-icons/pi';

import MySwiper from './MySwiper';
import { Cards } from '@/globals';
import { cards } from '@/data/cards';
import SERVER_URL from '@/serverfile';

type Props = {
  index: number;
  // image: string;
  images: string | string[];
  title: string;
  postCode: string;
  address: string;
  setCardList: Dispatch<SetStateAction<Cards[]>>;
  setFlag: Dispatch<SetStateAction<boolean>>;
};

const TinderSwipe: React.FC<Props> = memo(
  ({ index, images, title, postCode, address, setCardList, setFlag }) => {
    // カードの位置とカードをドラッグして移動させる機能
    // ユーザーがカードをドラッグするとmotionValueの値が更新され、カードが移動する
    const motionValue = useMotionValue(0);

    const controls = useAnimation();

    // カードがドラッグされるとカードが回転する機能
    // "motionValue"を基にして値の変換を行う
    const rotateValue = useTransform(motionValue, [-300, 300], [-30, 30]);

    //カードの位置と不透明度
    const opacityValue = useTransform(motionValue, [-200, -160, 0, 160, 200], [0.8, 1, 1, 1, 0.8]);

    const style = {
      position: 'absolute',
      zIndex: 2,
      width: '100%',
    };

    const localStorageControl = useCallback(() => {
      const savedCardList = localStorage.getItem('cardList');
      const restoredCardList = savedCardList ? JSON.parse(savedCardList) : null;
      if (!restoredCardList || JSON.stringify(restoredCardList) === JSON.stringify([])) {
        const filterArr = cards.filter((card) => card !== cards[index]);
        localStorage.setItem('cardList', JSON.stringify(filterArr));
      } else {
        const filterArr = restoredCardList.filter(
          (card: Cards) => card !== restoredCardList[index]
        );
        localStorage.setItem('cardList', JSON.stringify(filterArr));
      }
    }, []);

    const handleClickDislike = useCallback((index: number) => {
      console.log('dislike', cards[index]);
      controls.start({ x: -1000, opacity: 0, transition: { duration: 1 } });

      localStorageControl();
    }, []);

    const handleClickLike = useCallback(async (index: number) => {
      console.log('like', cards[index]);
      controls.start({ x: 1000, opacity: 0, transition: { duration: 1 } });

      localStorageControl();

      const postObj: Cards = {
        ...cards[index],
      };
      postObj.images = JSON.stringify(postObj.images);
      postObj.publicTransport = JSON.stringify(postObj.publicTransport);
      postObj.car = JSON.stringify(postObj.car);

      const postData = await fetch(
        // "/api/favorites",
        // "http://localhost:3001/api/favorites",
        // 'http://localhost:3000/api/favorites',
        `${SERVER_URL}/api/favorites`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ user_id: 1, ...postObj }),
          body: JSON.stringify({ user_id: 1, ...postObj }),
        }
      ).then((data) => data.json());
      console.log(postData);
    }, []);

    const handleDragEnd = useCallback((event: any, info: { velocity: any }) => {
      const { velocity } = info;
      if (Math.abs(velocity.x) > 300) {
        if (velocity.x < 0) {
          // ドラッグが左方向にある場合の処理（dislike）
          handleClickDislike(index);
        } else {
          // ドラッグが右方向にある場合の処理（like）
          handleClickLike(index);
        }
      }
    }, []);

    return (
      <motion.div
        // X方向のスワイプのみ
        drag="x"
        // エラーわからない
        style={{ ...style, x: motionValue, rotate: rotateValue, opacity: opacityValue }}
        // スワイプの範囲
        dragConstraints={{ left: -450, right: 450 }}
        onDragEnd={handleDragEnd} // ドラッグ終了時に実行される関数を指定
        animate={controls} // アニメーションを制御するためのオブジェクトを指定
      >
        <section className="main-card">
          <Link href="/select/[detail]" as={`/select/${index}`}>
            {/* <div>
            <img className="main-card-photo" src={image} alt={`${title}の写真`} />
          </div> */}
            <MySwiper images={images} className="main-card-photo" />
            <section className="main-description">
              <h2 className="main-description-title">{title}</h2>
              <h3 className="main-description-location">
                <PiMapPinLight className="main-icon" />
                所在地
              </h3>
              <p className="post-code">{`〒${postCode}`}</p>
              <p>{address}</p>
            </section>
          </Link>
          <div className="main-like-or-dislike">
            <div className="dislike" onClick={() => handleClickDislike(index)}>
              <HiOutlineHandThumbDown className="dislike" />
            </div>
            <div className="like" onClick={() => handleClickLike(index)}>
              <HiOutlineHandThumbUp className="like" />
            </div>
          </div>
        </section>
      </motion.div>
    );
  }
);

export default TinderSwipe;


'use client';

import { PiBellLight, PiUserLight, PiMagnifyingGlassLight, PiListLight, PiHouseLight } from "react-icons/pi";
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { memo, useEffect, useState } from "react";
import Link from "next/link";

import "./select.css";
import { cards } from "@/data/cards";
import { Cards } from "@/globals";
import TinderSwipe from "./TinderSwipe";
import Footer from "@/components/Footer";

const select = memo(() => {

  const [cardList, setCardList] = useState<Cards[]>([]);
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    const savedCardList = localStorage.getItem("cardList");
    const restoredCardList = savedCardList ? JSON.parse(savedCardList) : null;
    if (restoredCardList && JSON.stringify(restoredCardList) !== JSON.stringify([])) {
      setCardList(restoredCardList);
    } else {
      setCardList(cards);
    }
  }, []);

  return(
    <div className="select-page">
      <header className="header">
        <form className="search-container">
          <PiMagnifyingGlassLight className="search-icon"/>
          <input type="text" placeholder="  キーワード検索" />
        </form>
        <PiListLight />
      </header>

      {/* <main> */}
        <main className="main-cards">
          <p>
            {JSON.stringify(cardList) !== JSON.stringify([])
            ? "今日のおすすめ終了！"
            : "ロード中…"}
          </p>
          {cardList.map((card, index) => (
            <TinderSwipe
              key={index}
              index={index}
              // image={card.image}
              images={card.images}
              title={card.title}
              postCode={card.postCode}
              address={card.address}
              setCardList={setCardList}
              setFlag={setFlag}
            />
          ))}
        </main>
        {/* <section className="main-card">
          <MySwiper />
          <section className="main-description">
            <h2 className="main-description-title">香嵐渓</h2>
            <div className="main-description-location">
              <h3>所在地</h3>
              <p>〒444-2424<br/>愛知県豊田市足助町飯盛</p>
            </div>
          </section>
        </section> */}
        {/* <section className="sub-card">
          <h3>料金</h3>
          <p>無料</p>
          <h3>営業日・時間</h3>
          <p>見学終日</p>
          <h3>電話番号</h3>
          <p>0565-62-1272</p>
          <h3>駐車場</h3>
          <p>有料・香嵐渓駐車場（約670台）1台500円</p>
          <h3>トイレ</h3>
          <p>有</p>
          <h3>定休日</h3>
          <p>なし</p>
          <h3>公共交通機関でのアクセス</h3>
          <div>
            <ul>
              <li>名鉄豊田線「浄水駅」より、とよたおいでんバス猿投足助線に乗り換え「香嵐渓」バス停下車。徒歩すぐ</li>
              <li>名鉄三河線/豊田線「豊田市駅」より、名鉄バス矢並線に乗り換え「香嵐渓」バス停下車。徒歩すぐ</li>
              <li>名鉄本線「東岡崎駅」より、名鉄バス足助線に乗り換え「香嵐渓」バス停下車。徒歩すぐ</li>
            </ul>
          </div>
          <h3>車でのアクセス</h3>
          <div>
            <ul>
              <li>猿投グリーンロード「力石IC」から約15分</li>
              <li>東海環状自動車道「豊田勘八IC」から約20分</li>
            </ul>
          </div>
        </section> */}
      {/* </main> */}
      <Footer />
    </div>
  );
});

export default select;

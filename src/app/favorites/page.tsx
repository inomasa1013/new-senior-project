"use client";

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Icons from "./Icons";
import { styles } from "./style";

import "./page.css";
import { Prefecture } from "@/globals";
import SERVER_URL from "@/serverfile";
import Footer from "@/components/Footer";

const favorite = () => {
  // お気に入りが多い順番に受け取る。
  // {
  //   name: "愛知県",
  //   imgSrc: "url",
  //   number: 件数
  // }
  // const dammyData: Array<Prefecture> = [
  //   {
  //     name: '愛知県',
  //     imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Nagoya_Castle_7.jpg',
  //     number: 100,
  //   },
  //   {
  //     name: '東京都',
  //     imgSrc:
  //       'https://s3-ap-northeast-1.amazonaws.com/thegate/2020/12/24/17/47/58/kaminari_mon_main.jpg',
  //     number: 6,
  //   },
  //   {
  //     name: '北海道',
  //     imgSrc:
  //       'https://hokkaido-kanko-guide.com/wp-content/uploads/2022/07/990d1af0e5875bc162fb0d3e8aec6ef0-scaled.jpg',
  //     number: 3,
  //   },
  //   {
  //     name: '山形県',
  //     imgSrc:
  //       'https://travel.rakuten.co.jp/mytrip/sites/mytrip/files/styles/main_image/public/migration_article_images/ranking/spot-yamagata-key.jpg?itok=1TwxCvie',
  //     number: 1,
  //   },
  //   {
  //     name: '沖縄県',
  //     imgSrc:
  //       'https://www.his-j.com/kokunai/kanto/tour_info/okinawa/catchy/wp-content/uploads/2018/05/1%E4%B8%87%E5%BA%A7%E6%AF%9B.jpg',
  //     number: 1,
  //   },
  // ];

  // fetchでawait使いたいがページコンポーネントにasyncするとエラーするので詰んだ。一旦、型をanyとする。
  const [favoriteData, setFavoriteData] = useState<any>([]);
  // const [favoriteData, setFavoriteData] = useState<Prefecture[]>([]);

  useEffect(() => {
    async function fetchData<T>(): Promise<void> {
      // 県別いいねデータ取得
      const res: T = await fetch(`${SERVER_URL}/api/favorites`).then((res) =>
        res.json()
      );
      // const res: T = await fetch(`http://localhost:3000/api/favorites`).then((res) => res.json());
      console.log("res", res);
      setFavoriteData(res);
    }
    fetchData<Prefecture[]>();
  }, []); // 第2引数のロジック浮かんでない。

  return (
    <React.Fragment>
      <View>
        <Text>いいね一覧</Text>
      </View>
      <View>
        {favoriteData.length ? (
          <Icons favoriteData={favoriteData} />
        ) : (
          <Text style={styles.zanteitaisaku}>行きたい場所をいいねしよう！</Text>
        )}
      </View>
      <Footer />
    </React.Fragment>
  );
};

export default favorite;

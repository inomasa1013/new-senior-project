'use client';

import React, { useState } from 'react';
import './page.css';

const login = () => {
  const [mail, setMail] = useState<String>('');
  const [password, setPassword] = useState<String>('');

  // const handleMail = (e: { target: HTMLButtonElement }): void => setMail(e.target.value);
  // const handlePassword = (e: { target: HTMLButtonElement }): void => setPassword(e.target.value);
  const handleMail = (e: any): void => setMail(e.target.value);
  const handlePassword = (e: any): void => setPassword(e.target.value);

  return (
    <main className="login__main">
      <div className="login__image-wrapper">
        <img
          className="login__photo"
          src="https://www.knt.co.jp/holiday/images/holidayTop15_mv.jpg"
          alt="ログイン画像"
        ></img>
      </div>
      <section className="login__form">
        <h1>Sign In</h1>
        <label className="login__label" htmlFor="">
          Email
        </label>
        {/* 型エラーの解決策わかりませんが、動作は正常なことを確認済み by Asaoka */}
        <input type="text" onChange={(e) => handleMail(e)} />
        <label className="login__label" htmlFor="">
          Password
        </label>
        {/* 型エラーの解決策わかりませんが、動作は正常なことを確認済み by Asaoka */}
        <input type="text" onChange={(e) => handlePassword(e)} />
        <button className="login__button">Sign in</button>
        <div className="login__navbar">
          <a href="#" className="navbar__forgot-password-link">
            Forgot password
          </a>
          <a href="#" className="navbar__sign-up-link">
            Sign up
          </a>
        </div>
      </section>
    </main>
  );
};

export default login;


import React from 'react';
import Link from "next/link";
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { PiBellLight, PiUserLight, PiHouseLight } from "react-icons/pi";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Link href="/select">
        <PiHouseLight className="footer-icon" />
      </Link>
      <Link href="/notice">
        <PiBellLight className="footer-icon" />
      </Link>
      <Link href="/favorites">
        <HiOutlineHandThumbUp className="footer-icon footer-up" />
      </Link>
      <Link href="/">
        <PiUserLight className="footer-icon" />
      </Link>
  </footer>
  );
};

export default Footer;

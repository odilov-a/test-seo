import { LogoLaptop, LogoMobile, LogoTablet } from "assets/images";
import {
  ArrowUp,
  CallIcon,
  InstagramIcon,
  TelegramIcon,
} from "assets/images/icons";
import { useHooks } from "hooks";
import React, { useState } from "react";

const Footer = () => {
  const [selectedMap, setSelectedMap] = useState<boolean>(true);
  const { t } = useHooks();
  const handleButtonClick = (mapSrc: boolean) => {
    setSelectedMap(mapSrc);
  };
  return (
    <div className="footer">
      <div className="footer_top">
        <div className="footer_left">
          <p id="footer_left_title">{t("Ijtimoiy tarmoqlar")}</p>
          <div>
            <a href="https://t.me/gurlanglobal">
              <TelegramIcon />
              <p>{t("Telegram")}</p>
            </a>
            <a href="https://www.instagram.com/gurlanglobal/">
              <InstagramIcon />
              <p>{t("Instagram")}</p>
            </a>
          </div>
          <p id="footer_left_title">{t("Aloqa")}</p>
          <a href="tel:+998978570005">
            <CallIcon />
            <p>+99897-8570005</p>
          </a>
          <picture className="footer-logo">
            <source media="(max-width:450px)" srcSet={LogoMobile} />
            <source media="(max-width:990px)" srcSet={LogoTablet} />
            <img src={LogoLaptop} alt="Hero section img" />
          </picture>
        </div>
        <div className="footer_right">
          <div className="map_buttons_wrapper">
            <div className="map_buttons">
              <button
                onClick={() => handleButtonClick(true)}
                className={selectedMap === true ? "active" : ""}
              >
                Gurlan Global Teks
              </button>
              <button
                onClick={() => handleButtonClick(false)}
                className={selectedMap === false ? "active" : ""}
              >
                {t("Gap Yo’q yog’")}
              </button>
            </div>
            <button
            className="up-btn"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                })
              }
            >
              <ArrowUp />
            </button>
          </div>

          {selectedMap ? (
            <>
              <iframe
                title="Gurlan Global Teks"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95056.44242129514!2d60.297806524935375!3d41.88180549869543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41de3d34acd9eea7%3A0x3b846a79d9fbb837!2sGurlan%20Global%20Teks!5e0!3m2!1sru!2s!4v1711884295016!5m2!1sru!2s"
                width="600"
                height="450"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </>
          ) : (
            <>
              <iframe
                title="Gap yo'q yog'"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2972.4997971015537!2d60.383585975902875!3d41.83906797124604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41de3d00327bed0f%3A0xae889ba2b358a6c5!2sGap%20yo&#39;q%20yog&#39;-moy%20ishlab%20chiqarish%20korxonasi!5e0!3m2!1sru!2s!4v1711882167623!5m2!1sru!2s"
                width="600"
                height="450"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </>
          )}
        </div>
      </div>
      <div className="footer_bottom">
        <p>© {t("2024 Gurlan Global Teks. All rights reserved")}</p>
        <div>
          <a href="https://hypernova.uz" target="_blank">
            {t("Created by Hypernova")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

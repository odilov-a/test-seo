import { useEffect, useState } from "react";
import { Modal } from "antd";

import { useGet, useHooks } from "hooks";
import DealerMore from "./dealerMore";
import useStore from "store";

import { BackIcon, CallIcon, InstagramIcon, TelegramIcon, WhatsappIcon, YoutubeIcon } from "assets/images/icons";
import "assets/styles/_contact.scss";
import './style.scss'
import { uniqueId } from "lodash";
import axios from "axios";
import { toast } from "react-toastify";
import gsap from "gsap";
import { Helmet } from "react-helmet";

const Contact = () => {
  const { system: { loadingStatus } } = useStore()
  const [nameUser, setNameUser] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  let mm = gsap.matchMedia();
  useEffect(() => {
    if (loadingStatus) {
      mm.add("(min-width: 800px)", () => {
        gsap.from(".contact_page-left", {
          x: -800,
          duration: 1,
        });
        gsap.from(".contact_page-right", {
          x: 800,
          duration: 1,
        });
      });
    }
  }, [loadingStatus]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if any of the fields are empty
    if (!nameUser || !phoneNumber || !description) {
      // Handle empty fields
      toast.error("One or more fields are empty");
      return;
    }

    try {
      const telegramBotToken = "6778082956:AAHcBIYO_Kjg9w1SCby9g4sYGcm9EIVwSMg";
      const chatId = "-1002000914261";

      const text = `Message from website:
      📌 Name: ${nameUser}
      📞 Phone Number: ${phoneNumber}
      📝 Description: ${description}`;

      await axios.post(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          chat_id: chatId,
          text,
        }
      );

      setNameUser("");
      setPhoneNumber("");
      setDescription("");
      // Handle successful submission
      toast.success("Message sent succesfully")

      // Reset the form
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error);
    }
  };

  const { t, get } = useHooks()
  const [change, setChange] = useState(true);
  const [dealerModal, showDealerModal] = useState({ open: false, data: {} });

  const { data } = useGet({
    name: "contacts",
    url: "contacts",
    onSuccess: (data) => {
    },
    onError: (error) => {
    },
  });

  const contactsData = get(data, "data", [])

  const { data: dillersData } = useGet({
    name: "dealers",
    url: "dealers",
    onSuccess: (data) => {
    },
    onError: (error) => {
    },
  });

  const dillerData = get(dillersData, "data", [])

  return (
    <div className="contact_page">
      <Modal
        open={dealerModal.open}
        onOk={() => showDealerModal({ open: true, data: {} })}
        onCancel={() => showDealerModal({ open: false, data: {} })}
        footer={null}
        centered
        width={600}
        destroyOnClose
      >
        <DealerMore {...{ dealerModal }} />
      </Modal>
      <div className="contact_page_wrapper">
        <div>
        <Helmet>
        <title>Contact - Your Website Name</title>
        <meta
          name="description"
          content="Description of your about page."
        />
      </Helmet>
        </div>
        <div className="contact_page-left">
          <div className="g_page_title_wrapper">
            <span className="g_green_dot" />
            <p>{t("Aloqa")}</p>
          </div>
          <p className="contact_title">{t("Ijtimoiy tarmoqlar")}</p>
          <a href="https://t.me/gurlanglobal" target="_blank" className="contact_li">
            <TelegramIcon />
            <p>{t("Telegram")}</p>
          </a>
          <a href="https://www.instagram.com/gurlanglobal/" target="_blank" className="contact_li">
            <InstagramIcon />
            <p>{t("Instagram")}</p>
          </a>
          <a href={get(contactsData, "whatsup")} target="_blank" className="contact_li">
            <WhatsappIcon />
            <p>{t("Whatsapp")}</p>
          </a>
          <a href="https://www.youtube.com/@gapyoq_official" target="_blank" className="contact_li">
            <YoutubeIcon />
            <p>{t("Youtube")}</p>
          </a>
          <p className="contact_title">{t("Telefon raqamlar")}</p>
          <span className="contact_li">
            <CallIcon />
            <a href="+998978570005" target="_blank">+99897-857-00-05</a>
          </span>
          <span className="contact_li">
            <CallIcon />
            <a href="tel:+998622277474">+99862-227-74-74 </a>
          </span>
        </div>
        <div className="contact_page-right">
          <p className="contact_page-right-title">{t("Bog'lanish")}</p>
          <div className="contact_buttons">
            <button className={`${change === true ? "active" : ""}`} onClick={() => setChange(true)}>{t("Aloqa uchun")}</button>
            <button className={`${change === false ? "active" : ""}`} onClick={() => setChange(false)}>{t("Dillerlar uchun")}</button>
          </div>
          {change ? (
            <form >
              <input value={nameUser} onChange={(e) => setNameUser(e.target.value)} type="text" placeholder={t("Ismingiz")} />
              <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="number" placeholder={t("+998 99 900 11 00")} />
              <textarea
              value={description}
                onChange={(e) => setDescription(e.target.value)}
                name=""
                id=""
                cols={30}
                rows={10}
                placeholder={t("Xabar yozish")}
              ></textarea>
              <button onClick={handleSubmit} className="submit" type="submit">
                <BackIcon />
                <p>{t("Yuborish")}</p>
              </button>
            </form>
          ) : (
            <div className="diallers">
              {dillerData.map((item: any) => (
                <p key={uniqueId('diller')} onClick={() => showDealerModal({ open: true, data: { item } })} className="dialler_name">
                  {get(item, "name")}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;

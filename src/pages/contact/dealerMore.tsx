import { useHooks } from "hooks";
import { CallIcon, LocationIcon } from "assets/images/icons";


const DealerMore = ({ dealerModal }: any) => {
  const { t, get } = useHooks()

  const data = get(dealerModal, "data.item")

  return (
    <div className="modal">
      <h2 className="font-bold md:text-[1.4vw] max-[0px]:text-[6vw] modal-title">
        {get(data, "name")} {t("dagi diller ma'lumotlari")}
      </h2>
      <p className="contact_title">{t("Ijtimoiy tarmoqlar")}</p>
      <span className="contact_li">
        <CallIcon />
        <p>{get(data, "number")}</p>
      </span>
      <p className="contact_title">{t("Manzil")}</p>
      <span className="contact_li">
        <LocationIcon />
        <p>{get(data, "address")}</p>
      </span>
    </div>
  )
}

export default DealerMore
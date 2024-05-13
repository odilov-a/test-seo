import { Modal } from "antd";
import { useState } from "react";

import { useHooks } from "hooks";
import Container from "modules/container";
import useStore from "store";
import Comment from "../Comment";
import SendModal from "../Comment/sendModal";
import { storage } from "services";

const CommentSection = () => {
  const { get, t } = useHooks();
  const { comments, addComment } = useStore()

  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const [sendModal, showSendModal] = useState({ open: false, data: {} });
  const [think, setThink] = useState("");

  return (
    <div className="home_page_seventh-section">
      <Modal
        open={sendModal.open}
        onOk={() => showSendModal({ open: true, data: {} })}
        onCancel={() => showSendModal({ open: false, data: {} })}
        footer={null}
        centered
        title={t("Fikr qoldirish uchun ma’lumtolarni to’ldiring")}
        width={600}
        destroyOnClose
      >
        <SendModal {...{ sendModal, setThink, showSendModal, setAllData, page }} />
      </Modal>
      <p className="seventh-section_clients_title">{t("Mijoz fikrlari")}</p>
      <div className="seventh-section_comments">
        <Container.All
          name="feedbacks"
          url="feedbacks"
          params={{
            limit: 3,
            page,
          }}
        >
          {({ items, meta }) => {
            // addComment(items)
            return (
              <>
                {[...allData, ...items].map((item) => (
                  <Comment key={get(item, "_id")} {...{ item }} />
                ))}
                <div className="flex justify-between mt-[32px] comment_form">
                  <input
                    value={think}
                    className={`comment-input bg-[#fbfbfb] border-[0.1vw] ${think === "" ? "border-[red]" : "border-[gray]"}`}
                    placeholder={t("Fikringizni yozib qoldiring")}
                    onChange={(i) => setThink(get(i, "target.value"))}
                  />
                  <div className="flex">
                    <button  className={think === "" ? "comment-btn --primary --disabled" : "comment-btn --primary"} onClick={() => showSendModal({ open: think !== "" ? true : false , data: think })} type="button">
                      {t("Fikr qoldirish")}
                    </button>
                  </div>
                </div>
                {meta &&
                  page < meta.totalCount &&
                  meta.pageCount != meta.currentPage &&
                  3 <= items.length && (
                    <div className="mt-[40px] flex justify-center">
                      <div className="w-full">
                        <button
                          className="view-more"
                          onClick={() => {
                            setPage(page + 1);
                            setAllData([...allData, ...items]);
                          }}
                        >
                          {t("Ko'proq ko’rish")}
                        </button>
                      </div>
                    </div>
                  )}
              </>
            );
          }}
        </Container.All>
      </div>
    </div>
  )
}

export default CommentSection
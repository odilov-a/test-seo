import React, { ChangeEvent, useEffect, useState } from "react";
import { useHooks } from "hooks";
import { Container } from "modules";
import { Table } from "components";
import { Input } from "antd";
import { useDebounce, usePost } from "hooks";
import { Header } from "./components";

const Localization = () => {
  const { query, get } = useHooks();
  const { mutate } = usePost();
  const [inputValue, setInputValue] = useState<{
    value: string;
    data: {
      key: string;
      id: number;
      en: string;
      uz: string;
    } | null;
    changedLangCode: "uz" | "en" | null;
  }>({
    data: null,
    value: "",
    changedLangCode: null,
  });
  const inputValueDebounced = useDebounce(inputValue.value, 600);

  function handleTranslationInput(
    e: ChangeEvent<HTMLInputElement>,
    data: { key: string; id: number; en: string; uz: string },
    langCode: "uz" | "en"
  ) {
    setInputValue({
      value: e.target.value,
      data: data,
      changedLangCode: langCode,
    });
  }

  // useEffect(() => {
  //   if (inputValue.data) {
  //     mutate({
  //       url: `/translate/${inputValue.changedLangCode}`,
  //       method: "post",
  //       data: { [inputValue.data.key]: inputValueDebounced },
  //     });
  //   }
  // }, [inputValueDebounced]);

  return (
    <div>
      <Header />
      <h1>Localization</h1>
      {/* <Container.All
        url='/translate/admin/'
        name='localization'
        params={{
          limit: +get(query, "limit", 10),
          page: +get(query, "page", 1),
          sort: "-id",
          extra: {
            search: get(query, "search"),
          },
        }}
      >
        {({ isLoading, meta, items }) => {
          return (
            <div>
              <Table
                items={items}
                columns={[
                  {
                    key: "id",
                    title: "ID",
                    dataIndex: "id",
                    className: "class",
                    render: (value) => <>{value}</>,
                  },
                  {
                    key: "manba",
                    title: "Manba",
                    dataIndex: "key",
                    className: "class",
                    render: (value) => <>{value}</>,
                  },
                  {
                    key: "uz",
                    title: "O'zbek tilida",
                    dataIndex: "uz",
                    className: "class",
                    render: (value, data) => {
                      return (
                        <div>
                          <Input
                            defaultValue={value}
                            onChange={(e) => {
                              handleTranslationInput(e, data, "uz");
                            }}
                          />
                        </div>
                      );
                    },
                  },
                  {
                    key: "en",
                    title: "Ingliz tilida",
                    dataIndex: "en",
                    className: "class",
                    render: (value, data) => (
                      <div>
                        <Input
                          defaultValue={value}
                          onChange={(e) => {
                            handleTranslationInput(e, data, "en");
                          }}
                        />
                      </div>
                    ),
                  },
                ]}
                isLoading={isLoading}
                meta={meta}
              />
            </div>
          );
        }}
      </Container.All> */}
    </div>
  );
};

export default Localization;

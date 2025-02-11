'use client'
import {Locale} from "@/i18n/config";
import {setUserLocale} from "@/services/locale";
import React from "react";
import {useTranslations} from "next-intl";
import {Button, Dropdown, Menu} from "antd";
import {GlobalOutlined} from "@ant-design/icons";

export default function LocaleChanger(){
  const t = useTranslations('general');
  const handleChangeLocale = (locale: Locale) => {
    setUserLocale(locale);
  }

  const menu = (
    <Menu>
      <Menu.Item key="es" onClick={() => handleChangeLocale("es")}>
        🇪🇸 {t("es-button")}
      </Menu.Item>
      <Menu.Item key="en" onClick={() => handleChangeLocale("en")}>
        🇺🇸 {t("en-button")}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center justify-center">
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button icon={<GlobalOutlined />} className="shadow-md">
          {t("selectLanguage")}
        </Button>
      </Dropdown>
    </div>
  );
}

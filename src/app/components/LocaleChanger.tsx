'use client'
import {Locale} from "@/i18n/config";
import {setUserLocale} from "@/services/locale";
import React from "react";
import {useTranslations} from "next-intl";

export default function LocaleChanger(){
  const t = useTranslations('general');

    return(
      <div className={''}>
        <button onClick={() => {
          const locale = "es" as Locale;
          setUserLocale(locale);
        }}>{t('es-button')}</button>
        <button onClick={() => {
          const locale = "en" as Locale;
          setUserLocale(locale);
        }}>{t('en-button')}</button>
      </div>
    )
}

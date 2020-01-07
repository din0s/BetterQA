import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import gr from "./gr.json";

i18n.use(initReactI18next).init({
  resources: { en, gr },
  lng: "gr",
  keySeparator: false
});

export default i18n;

import Link from "next/link";
import { useTranslation } from "../../../i18n";

const logo_en = "/static/img/logo-en.png";
const logo_el = "/static/img/logo.png";

export default () => {
  const { i18n } = useTranslation();
  const logo = i18n.language === "en" ? logo_en : logo_el;

  return (
    <nav>
      <Link href="/">
        <img src={logo} alt="Logo" className="Logo" />
      </Link>
      <div className="Lang-switcher">
        <button className="Lang-gr" onClick={() => i18n.changeLanguage("el")}>
          <span role="img" aria-label="Greek">
            🇬🇷
          </span>
        </button>
        <button className="Lang-en" onClick={() => i18n.changeLanguage("en")}>
          <span role="img" aria-label="English">
            🇬🇧
          </span>
        </button>
      </div>
    </nav>
  );
};

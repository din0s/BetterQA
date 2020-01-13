import Link from "next/link";
import { useTranslation } from "../../../i18n";

export default () => {
  const { t } = useTranslation();
  return (
    <Link href="/">
      <span className="Back-text">{t("back")}</span>
    </Link>
  );
};

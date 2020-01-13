import { useTranslation } from "../../../i18n";

export default () => {
  const { t } = useTranslation();

  return (
    <span onClick={() => window.history.back()}>
      <span className="Back-text">{t("back")}</span>
    </span>
  );
};

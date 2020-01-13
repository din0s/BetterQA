import "./Programme.scss"

import Courses from "./components/courses/Courses";
import { useTranslation } from "../../../i18n";

function Programme() {
  const { t } = useTranslation();
  return (
    <main>
      <h1 className="Info-text">{t("desc")}</h1>
      <Courses />
    </main>
  );
}

export default Programme;

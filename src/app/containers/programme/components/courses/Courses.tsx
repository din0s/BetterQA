import "./Courses.scss";

import Link from "next/link";
import Spinner from "../../../../components/spinner/Spinner";
import avail from "../../../../../../public/static/json/available_courses.json";
import { useTranslation } from "../../../../../i18n";

type CourseJson = JSON & {
  qa: JSON & {
    general_data: JSON & { class_info: JSON & { instructors: string } };
  };
  coursecode: string;
  classID: string;
  titleEN: string;
  title: string;
  ects: number;
};

type SemesterJson = {
  courses: CourseJson[];
};

const SPLIT_REGEX = new RegExp("\\s*,\\s*");

export default () => {
  const semesters = new Array<SemesterJson>();
  try {
    for (var i = 0; i < 8; i++) {
      const jj = JSON.parse('{"courses":[]}');
      semesters.push(jj);
    }
    avail.courses.forEach(id => {
      const course = require(`../../../../../../public/static/json/${id}.json`);
      const period = course.period - 1;
      semesters[period].courses.push(course);
    });
  } catch (e) {}

  if (semesters.length === 0) {
    return <Spinner />;
  }

  const { t, i18n } = useTranslation();
  const en = i18n.language === "en";

  return (
    <div className="Semester-list">
      {semesters.map((s, index) => {
        return (
          <div key={`sem${index}`} className="Semester-container">
            <div className="Semester-info">
              <h2>{`${t("courses:semester")} ${index + 1}`}</h2>
              <h4>{`${s.courses.length} ${t("courses:courses")}`}</h4>
            </div>
            <table className="Semester-table">
              <thead className="Semester-head">
                <tr>
                  <th className="Head-cell">{t("courses:name")}</th>
                  <th className="Head-cell right">{t("courses:code")}</th>
                  <th className="Head-cell Opt-cell right">
                    {t("courses:ects")}
                  </th>
                  <th className="Head-cell right">{t("courses:teachers")}</th>
                </tr>
              </thead>
              <tbody className="Semester-body">
                {s.courses.map(c => {
                  let instrSet = new Set(
                    c.qa.general_data.class_info.instructors.split(SPLIT_REGEX)
                  );
                  return (
                    <Link
                      href={"/class/[id]"}
                      as={`/class/${c.classID}`}
                      key={c.classID}
                    >
                      <tr className="Course-row">
                        <td className="Course-cell">
                          <span className="Course-name">
                            <a>{en ? c.titleEN : c.title}</a>
                          </span>
                        </td>
                        <td className="Course-cell right">{c.coursecode}</td>
                        <td className="Course-cell Opt-cell right">{c.ects}</td>
                        <td className="Course-cell right">
                          <ul className="Course-teachers right">
                            {Array.from(instrSet).map(instr => (
                              <li key={instr}>{instr.trim()}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    </Link>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

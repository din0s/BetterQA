import "./Class.scss";

import { AssessMethod, CourseOrg, Language, QaData } from "./QaData";

import BackBar from "../../components/backbar/BackBar";
import { NextPage } from "next";
import Spinner from "../../components/spinner/Spinner";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useTranslation } from "../../../i18n";

const GET_CLASS_INFO = "https://ws-ext.it.auth.gr/open/getClassInfo/";

async function fetcher(url: RequestInfo) {
  return fetch(url).then(r => r.json());
}

type PromptProps = {
  className: string;
  prompt: string;
  text: string;
};

const PromptedText: NextPage<PromptProps> = ({ className, prompt, text }) => {
  return (
    <h4 className={`${className} prompt`}>
      <span className="strong">{prompt}</span>
      <span>{text}</span>
    </h4>
  );
};

type OptionalProps = {
  target: any;
  content: any;
};

const Optional: NextPage<OptionalProps> = ({ target, content }) => {
  if (target) {
    if (typeof target === "string") {
      if (target.trim() !== "") {
        return <span>{content}</span>;
      }
    } else if (typeof target === "object") {
      const arr = Array.from(target);
      if (arr.length !== 0) {
        return <span>{content}</span>;
      }
    }
  }
  return <span className="empty" />;
};

function splitNewlines(str: string, key: string) {
  return (
    <ul>
      {str.split("\n").map((s, i) => (
        <li key={`${key}${i}`}>{s}</li>
      ))}
    </ul>
  );
}

function Class() {
  const { query } = useRouter();
  const { t, i18n } = useTranslation();
  const lang: "el" | "en" = i18n.language;

  let { data, error } = useSWR(GET_CLASS_INFO + query.id, fetcher);
  if (!data) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{t("class:error")}</div>;
  }

  const qa_data: QaData = data.class.qa_data;
  const general = qa_data.general_data;

  const course_info = general.course_info;
  const title = course_info.course_title[lang];
  const code = course_info.course_code;
  const period = course_info.course_period;
  const t_charge = course_info.teacher_in_charge;

  const class_info = general.class_info;
  const year = class_info.academic_year;
  const instr = Array.from(
    new Set(class_info.instructors.split(",").map(s => s.trim()))
  ); // removing duplicates

  const info_form = qa_data.course_information_form_data;
  const types = info_form.type_of_the_course;

  const delivery = info_form.mode_of_delivery;

  const erasmus = info_form.erasmus === 1;
  const langs = info_form.language_of_instruction;

  const prereqs = info_form.prerequisites;
  const pre_courses = prereqs.required_courses;
  const pre_general = prereqs.general_prerequisites[lang];

  const outcome = info_form.learning_outcomes[lang];
  const competences = info_form.general_competences;

  // const outcome_categ = info_form.learning_outcomes_categorization;
  // const outcome_cogn = outcome_categ["Cognitive Domain"];
  // const outcome_affect = outcome_categ["Affective Domain"];
  // const outcome_psy = outcome_categ["Psychomotor Domain"];

  // const outcome_levels = info_form.levels_of_intended_learning_outcomes;
  // const outcome_know = outcome_levels["Knowledge"];
  // const outcome_comp = outcome_levels["Competence"];

  const syllabus = info_form.course_content_syllabus;
  const content = syllabus.course_content[lang];
  const keys = syllabus.keywords[lang];

  const edu_mat = info_form.educational_material_types;

  // eslint-disable-next-line
  const org = info_form.course_organization; // TODO: use this

  const assess = info_form.student_assessment;
  const assess_desc = assess.description_of_the_procedure[lang];

  const assess_meth = assess.assessment_methods;

  const digi_content = qa_data.digital_content;

  const bibliography = qa_data.bibliography;
  const eudoxus = bibliography.eudoxus;
  const additional = bibliography.additional;
  return (
    <div className="Info-content">
      <div className="Basic-info">
        <div className="primary">
          <h2 className="Class-code subtitle">{code}</h2>
          <h1 className="Class-title title">{title}</h1>
          <h3 className="Class-teachers subtitle">{instr.join(", ")}</h3>
        </div>
        <div className="secondary">
          <PromptedText
            className="Class-in-charge text"
            prompt={t("class:in-charge")}
            text={t_charge}
          />
          <PromptedText
            className="Class-period text"
            prompt={t("class:period")}
            text={period}
          />
          <PromptedText
            className="Class-year text"
            prompt={t("class:year")}
            text={year}
          />
          <h3 className="Class-erasmus text">
            {t("class:erasmus-" + (erasmus ? "y" : "n"))}
          </h3>
        </div>
      </div>
      <div className="Class-details">
        <div className="Flex-containers">
          <div className="Flex-container Class-types">
            <span className="Container-title">{t("class:type")}</span>
            {Object.keys(types).map(k => {
              const value = types[k];
              return (
                <span key={`t${k}`} className="Class-type">
                  {k} {value}
                </span>
              );
            })}
          </div>
          <div className="Flex-container Class-delivery-methods">
            <span className="Container-title">{t("class:delivery")}</span>
            {Object.keys(delivery).map(k => {
              const value = delivery[k];
              return (
                <span key={`d${k}`} className="delivery">
                  {k} {String(value)}
                </span>
              );
            })}
          </div>
          <div className="Flex-container Class-languages">
            <span className="Container-title">{t("class:languages")}</span>
            {Object.keys(langs).map(k => {
              const lang: Language = langs[k];
              return (
                <div key={`l${k}`} className="Lang-info">
                  <span className="Lang-name">{lang.name}</span>
                  <span className="Lang-varieties">
                    {Object.keys(lang.variety).map(i => {
                      const value = lang.variety[i];
                      return (
                        <span key={`v${i}`} className="variety">
                          {`${i} ${value}`}
                        </span>
                      );
                    })}
                  </span>
                  <span className="break" />
                </div>
              );
            })}
          </div>
          <div className="Flex-container Class-digital-content">
            <span className="Container-title">{t("class:links")}</span>
            {digi_content.map(d_content => {
              const { title, link } = d_content;
              return (
                <span key={title} className="Digital-content">
                  <a href={link}>{title}</a>
                </span>
              );
            })}
          </div>
        </div>
        <div className="Class-prereqs shrink">
          <Optional
            target={pre_courses}
            content={
              <div className="Prereq-courses">
                <header>{t("class:pre-courses")}</header>
                <ul>
                  {typeof pre_courses === "object"
                    ? pre_courses.map(c => {
                        const code = c.split(" ")[0];
                        return (
                          <li key={code} className="Prereq-course indent">
                            {c}
                          </li>
                        );
                      })
                    : pre_courses}
                </ul>
              </div>
            }
          />
          <Optional
            target={pre_general}
            content={
              <div className="Prereq-knowledge">
                <header className="spacer">{t("class:pre-knowledge")}</header>
                <span className="indent">{pre_general}</span>
              </div>
            }
          />
        </div>
        <div className="Focus-area">
          <div className="Class-outcome">
            <header>{t("class:goals")}</header>
            <div className="goal indent">{splitNewlines(outcome, "g")}</div>
          </div>
          <div className="Class-syllabus">
            <Optional
              target={content}
              content={
                <div className="Class-content">
                  <header className="spacer">{t("class:content")}</header>
                  <div className="indent">{splitNewlines(content, "cnt")}</div>
                </div>
              }
            />
            <Optional
              target={keys}
              content={
                <div className="Class-keywords">
                  <header className="spacer">{t("class:keywords")}</header>
                  <p className="indent">{keys}</p>
                </div>
              }
            />
          </div>
          <div className="Class-competences">
            <header className="spacer">{t("class:skills")}</header>
            <ul>
              {Object.keys(competences).map(k => {
                const value = competences[k];
                return (
                  <li key={`k${k}`} className="skill">
                    {value}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="Class-organization shrink">{/* TODO */}</div>
        <div className="Class-assessment shrink">
          <header>{t("class:assessment")}</header>
          <Optional
            target={assess_desc}
            content={
              <ul className="indent">{splitNewlines(assess_desc, "ass")}</ul>
            }
          />
          <ul className="Assessment-methods">
            {Object.keys(assess_meth).map(k => {
              const method: AssessMethod = assess_meth[k];
              const { name, variety } = method;
              const varieties = Object.keys(variety)
                .map(k => `${k} - ${variety[k]}`)
                .join(", ");
              return (
                <li key={`am${k}`} className="method indent">
                  {`${name} (${varieties})`}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="Class-material shrink">
          <header className="spacer">{t("class:material")}</header>
          <ul>
            {Object.keys(edu_mat).map(k => (
              <li key={`em${k}`} className="material indent">
                {`${k} ${edu_mat[k]}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="Class-bibliography shrink">
          <div className="Biblio-eudoxus">
            <header className="spacer">{t("class:biblio-eudoxus")}: </header>
            <p className="indent">{eudoxus}</p>
          </div>
          <div className="Biblio-extra">
            <header>{t("class:biblio-extra")}: </header>
            <p className="indent">{additional}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default () => (
  <main>
    <BackBar home={true} />
    <Class />
  </main>
);

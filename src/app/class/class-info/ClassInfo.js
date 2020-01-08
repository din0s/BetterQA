import React, { Component } from "react";
import "./ClassInfo.css";

import Spinner from "../../components/spinner/Spinner";

import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

const GET_CLASS_INFO = "https://ws-ext.it.auth.gr/open/getClassInfo/";

function PromptedText(props) {
  return (
    <h4 className={`${props.className} prompt`}>
      <span className="strong">{props.prompt}</span>
      <span>{props.text}</span>
    </h4>
  );
}

function Optional(props) {
  const target = props.target;
  if (target) {
    if (typeof target === "string") {
      if (target.trim() !== "") {
        console.log("str " + target);
        return props.content;
      }
    } else if (typeof target === "object") {
      const arr = Array.from(target);
      console.log(arr);
      if (arr.length !== 0) {
        return props.content;
      }
    }
  }
  console.log("empty");
  return <span className="empty" />;
}

class ClassInfo extends Component {
  constructor() {
    super();
    this.state = { data: null };
  }

  componentDidMount() {
    const { match } = this.props;
    fetch(GET_CLASS_INFO + match.params.classID)
      .then(res => res.json())
      .then(json => this.setState({ data: json.class.qa_data }))
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.data) {
      const { t, i18n } = this.props;
      const lang = i18n.language;

      const data = this.state.data;
      const general = data.general_data;

      const course_info = general.course_info;
      const title = course_info.course_title[lang];
      const code = course_info.course_code;
      const period = course_info.course_period;
      const t_charge = course_info.teacher_in_charge;

      const class_info = general.class_info;
      const year = class_info.academic_year;
      const instr = class_info.instructors;

      const info_form = data.course_information_form_data;
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

      const digi_content = data.digital_content;

      const bibliography = data.bibliography;
      const eudoxus = bibliography.eudoxus;
      const additional = bibliography.additional;

      return (
        <div className="Info-content">
          <div className="Basic-info">
            <div className="primary">
              <h2 className="Class-code subtitle">{code}</h2>
              <h1 className="Class-title title">{title}</h1>
              <h3 className="Class-teachers subtitle">{instr}</h3>
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
                {Object.keys(types).map(k => (
                  <span key={`t${k}`} className="Class-type">
                    {k} {types[k]}
                  </span>
                ))}
              </div>
              <div className="Flex-container Class-delivery-methods">
                <span className="Container-title">{t("class:delivery")}</span>
                {Object.keys(delivery).map(k => (
                  <span key={`d${k}`} className="delivery">
                    {delivery[k]}
                  </span>
                ))}
              </div>
              <div className="Flex-container Class-languages">
                <span className="Container-title">{t("class:languages")}</span>
                {Object.keys(langs).map(k => {
                  const lang = langs[k];
                  return (
                    <div key={`l${k}`} className="Lang-info">
                      <span className="Lang-name">{lang.name}</span>
                      <span className="Lang-varieties">
                        {Object.keys(lang.variety).map(k => (
                          <span key={`v${k}`} className="variety">
                            {`${k} ${lang.variety[k]}`}
                          </span>
                        ))}
                      </span>
                      <span className="break" />
                    </div>
                  );
                })}
              </div>
              <div className="Flex-container Class-digital-content">
                <span className="Container-title">{t("class:links")}</span>
                {Array.from(digi_content).map(dc => {
                  const title = dc.title;
                  const link = dc.link;
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
                      {Array.from(pre_courses).map(c => {
                        const code = String(c).split(" ")[0];
                        return (
                          <li key={code} className={"Prereq-course"}>
                            {c}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                }
              />
              <Optional
                target={pre_general}
                content={
                  <div className="Prereq-knowledge">
                    <header>{t("class:pre-knowledge")}</header>
                    <span>{pre_general}</span>
                  </div>
                }
              />
            </div>
            <div className="Focus-area">
              <div className="Class-outcome">
                <header>{t("class:goals")}</header>
                <p className="goal">{outcome}</p>
              </div>
              <div className="Class-syllabus">
                <Optional
                  target={content}
                  content={
                    <div className="Class-content">
                      <header>{t("class:content")}</header>
                      <p>{content}</p>
                    </div>
                  }
                />
                <Optional
                  target={keys}
                  content={
                    <div className="Class-keywords">
                      <header>{t("class:keywords")}</header>
                      <p>{keys}</p>
                    </div>
                  }
                />
              </div>
              <div className="Class-competences">
                <header>{t("class:skills")}</header>
                <ul>
                  {Object.keys(competences).map(k => (
                    <li
                      key={`k${k}`}
                      className="skill"
                    >{`${k} ${competences[k]}`}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="Class-organization shrink">{/* TODO */}</div>
            <div className="Class-assessment shrink">
              <header>{t("class:assessment")}</header>
              <Optional target={assess_desc} content={assess_desc} />
              <span className="Assessment-methods">
                <ul>
                  {Object.keys(assess_meth).map(k => {
                    const { name, variety } = assess_meth[k];
                    const varieties = Object.keys(variety)
                      .map(k => `${k} - ${variety[k]}`)
                      .join(", ");
                    return (
                      <li key={`am${k}`} className="method">
                        {`${name} (${varieties})`}
                      </li>
                    );
                  })}
                </ul>
              </span>
            </div>
            <div className="Class-material shrink">
              <header>{t("class:material")}</header>
              <ul>
                {Object.keys(edu_mat).map(k => (
                  <li key={`em${k}`} className="material">
                    {`${k} ${edu_mat[k]}`}
                  </li>
                ))}
              </ul>
            </div>
            <div className="Class-bibliography shrink">
              <div className="Biblio-eudoxus">
                <header>{t("class:biblio-eudoxus")}: </header>
                {eudoxus}
              </div>
              <div className="Biblio-extra">
                <header>{t("class:biblio-extra")}: </header>
                {additional}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <Spinner />;
  }
}

export default withRouter(withTranslation()(ClassInfo));

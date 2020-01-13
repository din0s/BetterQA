type ElEn = {
  el: string;
  en: string;
};

type bool = 1 | 0;

export type Language = {
  name: string;
  variety: any;
};

export type CourseOrg = {
  activity: {
    name: string;
    hours_of_instruction: string;
    workload: string;
    credits: string;
    invdividual: bool;
    teamwork: bool;
    erasmus: bool;
  };
};

export type AssessMethod = {
  name: string;
  variety: any;
};

export type QaData = {
  general_data: {
    course_info: {
      course_title: ElEn;
      course_code: string;
      department_id: string;
      course_period: string;
      teacher_in_charge: string;
    };
    class_info: {
      class_title: string;
      academic_year: string;
      class_period: string;
      instructors: string;
    };
  };
  course_information_form_data: {
    type_of_the_course: any | object;
    mode_of_delivery: any | object;
    digital_course_content: {
      label: string;
      url: string;
    }[];
    erasmus: bool;
    language_of_instruction: any | object;
    prerequisites: {
      required_courses: string[];
      general_prerequisites: ElEn;
    };
    learning_outcomes: ElEn;
    general_competences: any | object;
    learning_outcomes_categorization: {
      "Cognitive Domain": string[];
      "Affective Domain": string[];
    };
    levels_of_intended_learning_outcomes: {
      Knowledge: string;
      Competence: string;
      Skills: string;
    };
    course_content_syllabus: {
      course_content: ElEn;
      keywords: ElEn;
    };
    educational_material_types: any | object;
    use_of_information_and_communication_technologies: {
      use_of_ict: any | object;
      description: ElEn;
    };
    course_organization: any | object;
    student_assessment: {
      description_of_the_procedure: ElEn;
      assessment_methods: any | object;
      bibliography: {
        course_bibliography_eudoxus: string;
        additional_bibliography_for_study: string;
      };
    };
  };
  digital_content: {
    title: string;
    link: string;
  }[];
  bibliography: {
    eudoxus: string;
    additional: string;
  };
};

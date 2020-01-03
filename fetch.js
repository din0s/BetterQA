const fetch = require("node-fetch");
const fs = require("fs");

const PROG_ID = "600000438";
const GET_COURSES = "https://ws-ext.it.auth.gr/open/getStudiesProgCourses/";
const GET_COURSE_INFO = "https://ws-ext.it.auth.gr/open/getCourseInfo/";
const GET_CLASS_INFO = "https://ws-ext.it.auth.gr/open/getClassInfo/";
const FETCH_TIMEOUT = 1500;

function isWinter(course) {
  return course.qa.general_data.course_info.course_period === "Χειμερινή";
}

function getPeriod(course) {
  let code = course.coursecode;
  code = code.substring(code.indexOf("-") + 1);
  code = code.substring(0, code.indexOf("-"));
  return parseInt(code);
}

if (!fs.existsSync("./json")) {
  fs.mkdirSync("./json");
  console.log("Created JSON directory");
}

let classesFetched = 0;
fetch(GET_COURSES + PROG_ID)
  .then(res => res.json())
  .then(programJson => {
    console.log(`Fetched program courses for ${PROG_ID}`);
    programJson.courses.forEach(c => {
      let id = c.courseId;
      fetch(GET_COURSE_INFO + id)
        .then(res => res.json())
        .then(courseJson => {
          console.log(`Fetched course info for ${id}`);
          let course = courseJson.course;
          let classID = courseJson.course.classID;
          setTimeout(() => {
            fetch(GET_CLASS_INFO + classID)
              .then(res => res.json())
              .then(classJson => {
                course.qa = classJson.class.qa_data;
                course.winter = isWinter(course);
                course.period = getPeriod(course);
                let file = `./json/${id}.json`;
                fs.writeFile(file, JSON.stringify(course, null, 4), () =>
                  console.log(`Wrote to file ${file}`)
                );
              });
          }, ++classesFetched * FETCH_TIMEOUT);
        });
    });
  });

import React, { Component } from "react";
import "./Courses.css";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

const PROG_ID = "600000438";
const GET_COURSES = "https://ws-ext.it.auth.gr/open/getStudiesProgCourses/";

const SPLIT_REGEX = new RegExp("\\s*,\\s*");

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    width: "20vw"
  },
  body: {
    fontSize: "1rem",
    width: "15vw"
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

class Courses extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = { semesters: [], errors: false };
  }

  componentDidMount() {
    this._isMounted = true;
    let semesters = this.state.semesters;
    fetch(GET_COURSES + PROG_ID)
      .then(res => res.json())
      .then(coursesJson => {
        coursesJson.courses.forEach(c => {
          let id = c.courseId;
          fetch(`json/${id}.json`)
            .then(res => res.json())
            .then(classJson => {
              let semester = classJson.period - 1;
              if (semesters[semester] === undefined) {
                semesters[semester] = new Map();
              }
              semesters[semester].set(id, classJson);
              if (this._isMounted) {
                this.setState({ semesters, errors: false });
              }
            })
            .catch(err => console.log(err));
        });
      })
      .catch(err => this.setState({ semesters: [], errors: true }));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { t, i18n } = this.props;
    const en = i18n.language === "en";
    if (this.state.errors) {
      return <h1>An error occurred when querying the QA servers.</h1>;
    }
    return (
      <div className="Semester-list">
        {this.state.semesters.map((k, index) => {
          k = Array.from(k);
          return (
            <div key={`sem${index}`}>
              <TableContainer component={Paper} className="Semester-container">
                <div className="Semester-info">
                  <h2>{`${t("courses:semester")} ${index + 1}`}</h2>
                  <h4>{`${k.length} ${t("courses:courses")}`}</h4>
                </div>
                <Table className="Semester-table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell className="Head-cell">
                        {t("courses:name")}
                      </StyledTableCell>
                      <StyledTableCell align="right" className="Head-cell">
                        {t("courses:code")}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className="Head-cell Opt-cell"
                      >
                        {t("courses:ects")}
                      </StyledTableCell>
                      <StyledTableCell align="right" className="Head-cell">
                        {t("courses:teachers")}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {k.map(course => {
                      let c = course[1];
                      let instrSet = new Set(
                        c.qa.general_data.class_info.instructors.split(
                          SPLIT_REGEX
                        )
                      );
                      return (
                        <StyledTableRow
                          key={c.coursecode}
                          className="Course-row"
                          hover={true}
                        >
                          <StyledTableCell
                            component="th"
                            scope="row"
                            className="Course-cell"
                          >
                            <Link
                              to={"/class/" + c.classID}
                              className="Course-name"
                            >
                              {en ? c.titleEN : c.title}
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className="Course-cell"
                          >
                            {c.coursecode}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className="Course-cell Opt-cell"
                          >
                            {c.ects}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className="Course-cell"
                          >
                            <ul className="Course-teachers">
                              {Array.from(instrSet).map(instr => (
                                <li key={instr}>{instr.trim()}</li>
                              ))}
                            </ul>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withTranslation()(Courses);

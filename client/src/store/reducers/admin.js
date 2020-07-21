import {
  SET_CURRENT_SELECTED_ADMIN,
  SET_FACULTY,
  SET_CURRENT_SELECTED_TEACHER,
  GET_FACULTY_PROFILE,
  GET_STUDENT_LIST,
} from "../actionTypes";

export const currentAdmin = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_SELECTED_ADMIN:
      return action.admin;
    default:
      return state;
  }
};

export const faculty = (state = [], action) => {
  switch (action.type) {
    case SET_FACULTY:
      return action.faculty;
    default:
      return state;
  }
};

export const currentTeacher = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_SELECTED_TEACHER:
      return action.teacher;
    default:
      return state;
  }
};

export const studentlist = (state = {}, action) => {
  console.log("im here ");
  switch (action.type) {
    case GET_STUDENT_LIST:
     
      return action.students;
    default:
      console.log("no im here ");
      return state;
  }
};

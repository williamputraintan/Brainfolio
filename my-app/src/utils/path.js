/** Urls
 *  /app -> renders navigation bar
 *  /home -> Authenticated route
 * **/

const auth = "/auth"
const app = "/app";
const editBaseurl = "/home/edit/:username"


const Paths = {
  ABOUT_US: "/aboutUs",
  APP: app,
  AUTH: auth,
  HOME: app + "/home",
  PORTFOLIO:app + "/home/portfolio",
  PROJECT: app + "/project",
  SIGN_UP: auth + "/signup",
  SIGN_UP_1: auth + "/signup/1",
  SIGN_UP_2: auth + "/signup/2",
  SIGN_UP_3: auth + "/signup/3",
  SIGN_IN: auth + "/signin",
  EDIT_PORTFOLIO: "/home/edit",
  EDIT_CONTACT: editBaseurl + "/contact",
  EDIT_EDUCATION: editBaseurl + "/education",
  EDIT_SKILLS: editBaseurl + "/skills",
  EDIT_EXPERIENCE:editBaseurl +  "/experience",
  EDIT_PROJECTS: editBaseurl + "/project",
  EDIT_CUSTOM1: editBaseurl + "/custom1",
  EDIT_CUSTOM2: editBaseurl + "/custom2",
  EDIT_OVERVIEW: editBaseurl + "/overview",
}

export default Paths
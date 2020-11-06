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
  PORTFOLIO:app + "/portfolio",
  PROJECT: app + "/project",
  SIGN_UP: auth + "/signup",
  SIGN_UP_1: auth + "/signup/1",
  SIGN_UP_2: auth + "/signup/2",
  SIGN_UP_3: auth + "/signup/3",
  SIGN_IN: auth + "/signin",
  ALL_PROJECT: app + "/home/allproject",
  EDIT_PORTFOLIO:app + "/home/edit",
  EDIT_CONTACT: app +editBaseurl + "/contact",
  EDIT_EDUCATION: app +editBaseurl + "/education",
  EDIT_SKILLS: app +editBaseurl + "/skills",
  EDIT_EXPERIENCE:app +editBaseurl +  "/experience",
  EDIT_PROJECTS:app + editBaseurl + "/projects",
  EDIT_CUSTOM1: app +editBaseurl + "/custom1",
  EDIT_CUSTOM2: app +editBaseurl + "/custom2",
  EDIT_OVERVIEW: app +editBaseurl + "/overview",
}

export default Paths
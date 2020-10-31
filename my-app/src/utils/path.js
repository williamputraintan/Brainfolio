/** Urls
 *  /app -> renders navigation bar
 *  /home -> Authenticated route
 * **/

const auth = "/auth"

const Paths = {
  SIGN_UP: auth + "/signup",
  SIGN_UP_1: auth + "/signup/1",
  SIGN_UP_2: auth + "/signup/2",
  SIGN_UP_3: auth + "/signup/3",
  SIGN_IN: auth + "/signin",
  HOME: "/home",
  PORTFOLIO: "/home/portfolio",
  ABOUT_US: "/aboutUs",
  PROJECT: "/project",
  EDIT_PORTFOLIO: "/home/edit",
}

export default Paths
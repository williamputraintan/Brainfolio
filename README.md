





# Brainfolio
<p align="center">
  <img src="https://github.com/wintan123/Brainfolio/blob/prod/my-app/src/Assets/images/Logo/LogoLight.png">
</p>

Brainfolio is a digital portfolio web app developed with NestJS and ReactJS

## Site

### Animations

<p float="left">
  <img alt="Search" src="https://github.com/wintan123/Brainfolio/blob/prod/screenshots/Search.gif"/>
  <img alt="Set username" src="https://github.com/wintan123/Brainfolio/blob/prod/screenshots/SetUsername.gif"/>
</p>

### Functionalities
![Project Display](https://github.com/wintan123/Brainfolio/blob/prod/screenshots/ProjectsDisplay.gif)  
**Profile Visibility**  
![Private Profile](https://github.com/wintan123/Brainfolio/blob/prod/screenshots/privateProfile.gif)


## Mobile
<p float="left">
  <img alt="Mobile dark mode" src="https://github.com/wintan123/Brainfolio/blob/prod/screenshots/DarkMode.gif" width="300"/>
  <img alt="Mobile UI animation" src="https://github.com/wintan123/Brainfolio/blob/prod/screenshots/Mobile.gif" width="300"/>
</p>



[![CircleCI](https://circleci.com/gh/warmnuances/Brainfolio-prod/tree/testBranch.svg?style=shield&circle-token=5c717fc9b0423e3af7ff084ca0c91e3b497c21e3)](https://testdockerprod123.herokuapp.com/swagger)


## Links
### App

**Backend** - https://testdockerprod123.herokuapp.com/swagger/  
**Frontend** - https://brainfolio.herokuapp.com/  

### Repo

**Backend** - https://github.com/warmnuances/Brainfolio-prod  
**Frontend** - https://github.com/wintan123/Brainfolio  


## Tech Stack
**NestJS** - Intially, we picked .NetCore to have a taste of enterprise development. However, the lack of libraries in the .NetCore forced us to seek another solution. NestJS turns out to be that perfect solution as it support Dependency Injection used in enterprise solutions such as Spring Boot and .Net. We applied service repostiory pattern design in our code. 

**ReactJS** - We knew we wanted a Single Page Application for a more native web experience. Adopting React has also allowed for a more components-based mindset which greatly contributed to seperations of concerns. It increase the interactivity of the application and helps greatly with state management

**MongoDB** - Using NoSQL such as MongoDB takes away the need to design database as it provides flexibility. Using MongoDB helps us focus more on developing features instead of designing database. The nature of our data also greatly align with the structure of NoSQL as most of our data by nature is of One-to-One relationship. 

**Firebase** - Firebase provide a great and ease of use OAuth Server. With firebase, we delegate the responsibility of storing password and sensitive information with firebase. Firebase Storage also provides a way for the application to store files.

## CI/CD
**CircleCI** - Used for creating a custom CICD pipelines and helpes with automatic docker deployment 
**Heroku** - Deploying on Heroku is easy and Heroku allows docker container hosting which makes heroku a great choice
**Github** - Github is used as a version control 
**Docker** - Initially used to reduce build size when compiling bcrypt binaries. Overall, it helps to ensure necessary files are in production and nothing more.

## Build Pipeline
1. Git push triggers a job in CircleCI that install dependencies and run e2e tests. 
2. If e2e tests succeeds, it merged with the production branch
3. In the production branch, multi stage docker build is executed which create a minimal and sufficient build for production
4. Once the docker image is build, it is pushed to Heroku Container registry and released into the heroku dyno which our apps lives in.


## Development Guide
Steps to recreate production such as: (cd, npm install, npm start, runs on localhost3000 (frontend) localhost5000 backend)
**Front-end** - Create a performant 

## Documentation
This can be found in our docs file (include https://drive.google.com/drive/folders/1aHxL7sSejj5TpGqYbi4OyQU4PPwtCi-L?usp=sharing into our repository if possible). Files include:

1. Backend File Layers
2. Front end File Layers
4. Architecture diagram
5. User Stories and personas
6. Whodobefeel and motivational model
7. UML Diagram (Missing, need to make a new updated one)
8. Change Log: Sprint Retrospective

## Things we think we did well
**Adopting TypeScript for the backend** - Catching compile time errors helped in saving time during deployment and improved the overall developer experience

**Code-splitting** - Lazy loading components improved the overall performance of the app. We did a lighthouse test and saw an improvement of **16** for performance score to the **90** range.

## Lessons Learnt
1) **Unnecassary Rerenders** - This project uses React Context for global state management and the lack of state slicing **(See [reselect](https://stackoverflow.com/questions/59741558/implement-useselector-equivalent-for-react-context))** really causes unneccessary rerenders. We should have adopted redux from the start.
3) **Folder structure and code design** - As we code more and more , we discovered more effecient ways of reusing code logic and structuring code.

## Change Log

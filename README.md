<!--
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->


<!-- PROJECT LOGO -->
<!--
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Best-README-Template</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</div>
-->



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]]



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![MongoDB][Mongo.db]][Mongo-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

Before installing, download and install Node.js. Node.js 0.10 or higher is required.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AradRoy/swimming-pool-timetable.git
   ```
2. Install NPM packages for the Backend
   ```sh
   cd backend
   npm install
   ```
3. In the root of the backend folder, create a new file and name it ".env".
   in the file write the following and fill in your MongoDB URL and the port you wish to use for the server
   ```sh
   MONGO_URI = your_URL_here
   PORT = 5000 for_example
   ```
4. Install NPM packages for the Frontend
   ```sh
   cd..
   cd frontend
   npm install
   ```
### Run the backend server
   ```sh
   cd backend
   npm start
   ```
### Run the frontend user inteface
   (When the process is finished a web page will open in your browser)
   ```sh
   cd frontend
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

With the interface on your browser: `localhost:3000`, 
you can input athlete lists by hand or upload athlete list file from your computer (CSV or JSON).
Some sample data is provided in the /backend/db/ folder.
From the athletepage you are able to remove athletes from the list.

Once you are happy with the athlete list click the "Timetable" tab and your timetable will automatically be calculated
and presented. A card view tab is avalable if you prefer the look.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Athlete page
    - [x] Single Input
    - [x] File Upload
- [x] Add back to top links
    - [x] Algorithim
    - [x] Calendar View
    - [x] Cards View
- [ ] Add Coaches Page
- [ ] Improve UI
- [ ] About Page


See the [open issues](https://github.com/AradRoy/swimming-pool-timetable/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Roy Arad - [LinkedIn](https://www.linkedin.com/in/Roy-Arad/)

Project Link: [https://github.com/AradRoy/swimming-pool-timetable](https://github.com/AradRoy/swimming-pool-timetable)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: frontend/src/assets/screenshot.jpg
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[Mongo.db]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com/cloud/atlas
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com






ADDED CONSTRAINTS:
max in lesson = 5

CONSIDERATIONS
    fewer times you hit the database, the better => nested loop is less expensive
    memory is faster than network

Yotam   all             mon thu         16-20
Yoni    brest buterfly  tue wed thu     08-15
Jonny   all             sun tue thu     10-19


profit = least unsolves
crowded = min avrage kids in lesson

maximum profit aproach: profit -> crowded
    runs:
        fill all groups
            create list of avalable lessons (one hour) = time slots
            filter by pref none, group, grouponly
            fill according to crowded - next kid in the most empty lesson
                in the pol are only lessons with correct style
        fill all private only
            create list of avalable lessons (45 min) = time slots
            filter private only
                ill according to crowded - next kid in the most empty lesson
                in the pol are only lessons with correct style
        fill private perf else put in groups

    evaluate model:
*/

todo:
error handler
validation
algorithim optimization

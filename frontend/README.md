
# HeartSync
![logo](/frontend/readme_images/logo.png)

### Acknowledgments
HeartSync is a product of the Hack for Good initiative, inspired by Big at Heart's problem statement. We extend our gratitude to [acknowledged parties, if any] for their support and contributions.

### About
Offering customizable enrollment forms, streamlined QR attendance tracking, comprehensive reporting and more, HeartSync serves as a comprehensive solution, connecting organizations with eager volunteers and empowering kind-hearted individuals to extend a helping hand effortlessly.

### Demo Link: 
Access our project demo [here](https://h4g.seeleng.dev)!

## Table of Contents

- [HeartSync](#heartsync)
    - [Acknowledgments](#acknowledgments)
    - [About](#about)
    - [Demo Link:](#demo-link)
  - [Table of Contents](#table-of-contents)
  - [Project Status](#project-status)
  - [Features](#features)
    - [Volunteer Features](#volunteer-features)
      - [Volunteer Interface Screenshots](#volunteer-interface-screenshots)
      - [Profile Page](#profile-page)
      - [Dashboard](#dashboard)
      - [Events](#events)
      - [Personal Activity Page](#personal-activity-page)
      - [Blogs](#blogs)
    - [Admin Features](#admin-features)
      - [Admin Interface Screenshots](#admin-interface-screenshots)
      - [Volunteer List](#volunteer-list)
      - [Activity List](#activity-list)
      - [Organisation List](#organisation-list)
      - [Volunteer Activity Report](#volunteer-activity-report)
      - [Volunteer Demographic Report](#volunteer-demographic-report)
  - [Contributing](#contributing)
  - [Installation](#installation)
    - [Technologies](#technologies)
    - [Credits](#credits)

## Project Status
This project is currently in development. We have many features in place (see [features](#features) below for a more in-depth walk through of our product) and to come!

## Features

We provide 2 interfaces - one for the volunteer, another for the admin. 
- See [volunteer features](#volunteer-features)
- See [admin features](#admin-features)

### Volunteer Features
Volunteers have access to a [profile page](#profile-page), [dashboard](#dashboard), [events](#events), [personal activity page](#personal-activity-page), [blogs](#blogs). 
#### Volunteer Interface Screenshots
<div style="overflow-x: scroll; display: flex;">
  <img src="/frontend/readme_images/login.png" style="width: 60%; flex-shrink: 0;">
  <img src="/frontend/readme_images/dashboard.png" style="width: 60%; flex-shrink: 0;">
  <img src="/frontend/readme_images/volunteerOpp.png" style="width: 60%; flex-shrink: 0;">
  <img src="/frontend/readme_images/volActivity.png" style="width: 60%; flex-shrink: 0;">
  <img src="/frontend/readme_images/blogMain.png" style="width: 60%; flex-shrink: 0;">
  <img src="/frontend/readme_images/createBlog.png" style="width: 60%; flex-shrink: 0;">
</div>


#### Profile Page 
This page allows volunteers to track their personal details by
- updating basic personal information such as age, name, email, gender, date of birth, education level, immigration status, description, salutation, profile image.
- updating skills and interest by choosing from preselected lists
- updating availability such as commitment preference (Adhoc, Weekly, Monthly), vehicle ownage and exact time itervals they are free on throughout the week (split into Morning, Afternoon, Evening time slots)
Additionally, attendance for events can be taken by scanning the volunteers individual QR code found within their profile page.

#### Dashboard
The dashboard is the page the volunteer is greeted by upon log in/ sign up. It contains a all-in-one view of
- upcoming events the user has signed up for (top left)
- activities (top right)
- blogs (bottom left)
- outstanding feedback reminders (bottom right)

#### Events
This page allows volunteers 
- to browse events
- sign up for events. By clicking on a specific event, the volunteer will be brought to the main page of the activity containing more details on the event such as location, timing, description. From there if they can click on the `Enroll in Event` button to indicate their availability for specific timeslots. 

#### Personal Activity Page
This page allows users to track their events by
- viewing all of their upcoming and past events they have signed up for

Additionally, for events that they have attended, volunteers can 
  - check if they have received any feedback
  - download certificates issued to them by the organisation in charge of the event

#### Blogs
This page allows volunteers to reflect and recount on their experience and read about others journey through
- reading blogs they and other volunteers have written
- filtering blogs written by themselves
- creating, editing and deleting their blog entries

### Admin Features
Admins have access to the [volunteer list](#volunteer-list), [activity list](#activity-list), [organisation list](), [volunteer activity report](), [volunteer demographic report]()
#### Admin Interface Screenshots
<div style="overflow-x: scroll; display: flex;">
  <img src="/frontend/readme_images/volunteerList.png" style="width: 60%; flex-shrink: 0;">
  <img src="/frontend/readme_images/activityList.png" style="width: 60%; flex-shrink: 0;">
  <img src="/frontend/readme_images/orgList.png" style="width: 60%; flex-shrink: 0;">
  <img src="/frontend/readme_images/xl.png" style="width: 60%; flex-shrink: 0;">
  <img src="/frontend/readme_images/chart.png" style="width: 60%; flex-shrink: 0;">
</div>

#### Volunteer List
Admins are able to track and find volunteers on this page by:
-  using the search bar on the top left to look for volunteers by their name or emails
-  have a full view of all volunteers that have signed up and their emails

#### Activity List
Admins are able to manage activities by:
-  using the search bar on the top left to look for activities by their name
-  have a full view of all activities together with their type (Volunteering, Workshop, Training) and the organisations they fall under
-  creating new activities by clicking on the `Create` button on the top right corner. This leads them to fill in details of the activity such as name, location, session timings, description, images, capacity and type
  
#### Organisation List
Admins are able to manage organisations by: 
-  have a full view of all organisations together with their 
-  creating new organisations by clicking on the `Create Organisation` button on the top right corner. This leads them to fill in details of the organisation such as name, description, images, tags, website url
-  edit exisiting organisations
-  view specific organisations page containing all their details

#### Volunteer Activity Report
This feature allows admins to analyse volunteer activity by
- viewing visual reports generated by volunteer activity by volunteer or hour across a timeline for different interest areas
- exporting these reports as a excel spreadsheet
- using the search bar to look for volunteers by their name or email


#### Volunteer Demographic Report
This feature allows admins to analyse volunteer demographic information by
- viewing visual reports generated by grouping volunteers by their age, gender, immigration status, skills, interests
- exporting these reports as a excel spreadsheet
- using the search bar to look for volunteers by their name or email
- filtering the volunteer list of a specific view by their sub-categories e.g. (selecting Gender as the main view and male as the sub-category)


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (git checkout -b feature-name)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin feature-name)
5. Create a new Pull Request

## Installation

1. Move to a directory you want to store the project:
   ```sh
   cd [path to folder you want to store the project]
    ```
2. Clone the repository
    ```sh
    git clone https://github.com/seelengxd/h4g-2024.git
    ```
3. Once the project is done cloning, go to the project-directory
   ```sh
   cd [project-directory]
   ```
4. Install the dependencies for frontend and backend seperately
   - Navigate to backend and type into your command prompt
        ```sh
        cd backend
        npm install
        ```

   - Return to root directory and do the same for frontend
        ```sh
        cd frontend
        npm install
        ```
5. Running the project
   - Open 2 command prompts
   - Navigate to backend and run `npm run dev`
   - In another command prompt, navigate to frontend and run `npm start`


### Technologies
We built this project with:
- Design: `Figma`
- Frontend: `React`, `Redux`, `Formik`, `TailwindCSS`, `CanvasJS`, `XLSX-renderer`
- Backend: `Express`, `Prisma`, `PDFLib`
- Deployment: `Nginx`, `DigitalOcean`

### Credits
List of Contributors:
- [@seelengxd](https://github.com/seelengxd)
- [@chloeelim](https://github.com/chloeelim)
- [@zichen-3974](https://github.com/zichen-3974)
- [@rachelNgiam]()
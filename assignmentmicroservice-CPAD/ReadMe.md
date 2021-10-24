# To Setup:
- npm init -y
- npm install express body-parser request mongoose axios cors

# Execute below command to Run Locally:
- Node assignments.js 3636
### Make Sure below line in assignments.js file
- const tasksService = 'http://localhost:3434/';
- const usersService = 'http://localhost:3535/';

# Execute below command to run in Docker:
- docker build -t assignmentservice .
- docker run -p 3636:3636 assignmentservice
### Make Sure below line in assignments.js file
- const tasksService = 'http://YOUR_IP_ADDRESS:3434/';
- const usersService = 'http://YOUR_IP_ADDRESS:3535/';

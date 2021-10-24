# To Setup:
- npm init -y
- npm install express body-parser request mongoose axios cors

# Execute below command to Run Locally:
- Node todonotes.js 3434

# Execute below command to run in Docker:
- docker build -t taskservice .
- docker run -p 3434:3434 taskservice

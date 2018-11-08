<<<<<<< HEAD
# Assignment - Week 2

Time: 4 hrs
=======
Heroku path : https://express-rest-api-31102018.herokuapp.com/
# Restful API's using Express.js

## Part 1: Note Taking Application (Reference Google Keep: <keep.google.com>)

The objective of Part 1 is to demonstrate Technical Capability using ExpressJS.

Create a Restful API for a Note taking application. You should be able to `Create`, `Read`, `Update` and `Delete` a particular note. Also, create one api to fetch all the Notes. 
>>>>>>> 7524e02e01019a9f0601333f3ad3340a0040c36d

# Part 1
The objective is to demonstrate implementation of Authentication and Authorization, and Routes Protection

For the Trello Application:
1. Create Login And Register Route
2. Write Passport MiddleWare to authenticate user
3. Protect all the Other Routes. All the backend-routes can only be accessible only when the user is authenticated

# Part 2
The objective is to demonstrate the ability to write Unit Tests for the applications built so far

For the Trello Application:
1. Write unit test cases for your protected(authenticated) & unprotected routes using Mocha, Chai, Supertest
1. Write Swagger documentation for your REST APIs
1. Follow a standard folder structure of your REST API code
1. Configure Gitlab-CI, such that, it runs test cases every push to master branch is deployed to heroku

<<<<<<< HEAD
# Prerequisites
1. Ensure NodeJS, NPM and Git are installed
1. Ensure a Text Editor is installed. Choose one of Sublime Text 3, Visual Studio Code, or Atom

# Setup
1. Start by forking this repository into your account.
2. Add your 02-express-rest-api repository as a remote with the command: `git add remote 02-express-rest-api <insert-02-express-rest-api-repository-url-here>`
3. Merge your 02-express-rest-api changes into the master branch with the command: `git merge 02-express-rest-api/master`. You will get a merge conflict in Readme.md file.
4. Update the Readme.md file to these instructions, and remove the instructions from 02-express-rest-api.
5. Commit the changes. You are now ready to start working on this programming task.

# Submission
1. After completing the exercise/assignment, create a git tag by typing the command `git tag submission`
2. Push your tag to the server by typing the command `git push origin submission`

# Post Submission
- A mentor will review your submission, and will open an issue with review comments.
- You must resolve all the review comments, and re-submit the assignment, by following the steps in Submission

# Completion
- Submission does not mean that the assignment is complete
- Expect 2-5 Iterations before the assignment is accepted as Complete by a mentor
=======
CD should be configured and the API's should be deployed on Heroku.

## Part 2: Build RESTful APIs for Kanban Application (Reference: Trello <trello.com>)

The objective of Part 2 is to demonstrate Design Capabilities for HTTP API Design.

Create RESTful APIs for a Kanban Application, which include the following functionality
1. Create, Retrieve, Update and Delete Boards
2. Create a list at an index in Board
3. Create a card at an index in a list in a Board

## Part 3: Build RESTful APIs for a Collaboration Application (Reference: Slack <slack.com>)

The objective of Part 2 is to demonstrate Design Capabilities for HTTP API Design.

Create RESTful APIs for a Collaboration Application, which include the following functionality
1. Create, Retrieve, Update and Delete Workspaces
2. Add users to workspace
3. Create channel in workspace
4. Add users to channels in workspace
5. List Users in a channel


# Further Reading Required
- RESTful APIs cheatsheet: https://github.com/RestCheatSheet/api-cheat-sheet
- Array Iteration Methods: every, find, findIndex, filter, sort, map, reduce, reduceRight


# Prerequisites

Ensure NodeJS, NPM and Git are installed
Ensure a Text Editor is installed. Choose one of Sublime Text 3, Visual Studio Code, or Atom



# Setup


Start by forking this repository into your account.



# Submission


After completing the exercise/assignment, create a git tag by typing the command git tag submission

Push your tag to the server by typing the command git push origin submission




# Post Submission


A mentor will review your submission, and will open an issue with review comments. Please allow only the mentor to close this issue.
You must resolve all the review comments, and re-submit the assignment, by creating a new tag and pushing:

- For first refactor, tag with `git tag refactor-1`, and push: `git push origin master`. Update this with refactor-2, and so on for subsequent submissions.



# Completion


Submission does not mean that the assignment is complete
Expect 2-5 Iterations before the assignment is accepted as Complete by a mentor
>>>>>>> 7524e02e01019a9f0601333f3ad3340a0040c36d

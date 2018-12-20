To test:

scaling sessionless authorization : localhost:3000/
scaling session based authentication: localhost:3000/trelloHome/












Assignment - Week 5

Submission date : 10th Dec

The objective is to dockerize your application, and implement scalable authentication.


Configure Scalable Authentication using JWT


Technical requirements


Dockerize your application, and write a docker-compose.yml file for starting the application and its dependencies
Implement a scaling mechanism for both the applications (Will be covered during Dec 6 Session)
For one application, use session based authentication, and for the second one, use Session-less authentication.
Mention the authentication details in README.md file



Prerequisites


Ensure NodeJS, NPM and Git are installed
Ensure a Text Editor is installed. Choose one of Sublime Text 3, Visual Studio Code, or Atom
Ensure Docker and docker-compose is installed



Setup


Start by forking and cloning this repository into your account.
Add your 05-socket.io repository as a remote with the command: git add remote 05-socket.io <insert-05-socket.io-repository-url-here>

git remote -v should display origin and 05-socket.io
pull your 05-socket.io changes into the master branch with the command: git pull 05-socket.io master. Now there will be merge conflict in README.md file.
Update the Readme.md file to these instructions, and remove the instructions from 05-socket.io.
Commit the changes. You are now ready to start working on this programming task.



Submission


After completing the exercise/assignment, create a git tag by typing the command git tag submission

Push your tag to the server by typing the command git push origin submission




Post Submission


A mentor will review your submission, and will open an issue with review comments.
You must resolve all the review comments, and re-submit the assignment, by following the steps in Submission



Completion


Submission does not mean that the assignment is complete
Expect 2-5 Iterations before the assignment is accepted as Complete by a mentor
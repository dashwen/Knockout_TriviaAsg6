# TriviaGame using Knockout
# Javier Torres and Deshawn Dana
# Assignment 6: Trivia Game using MongoDB, Redis, Express, Node.js, Socket.io and Knockout

=========================   Requirements to Run   ================================

Node.js
Mongodb
Express
Socket.io
Redis

=========================    Instructions     ====================================

1. clone repository
2. Goto Knockout_TriviaAsg6 folder
3. open command prompt and type the follow commands
4. If Package.json not working, run the following commands
   npm install —-save mongodb
   npm install —-save express
   npm install —-save mongodb
   npm install —-save socket.io
   npm install —-save redis 

========================  To Run Trivia Game  =====================================

   MUST FOLLOW IN ORDER!

1. Open 4 command console windows
2. On Command console window1, type mongod and press enter
3. On Command console window2, type redis-server and press enter
4. On Command console window3, type node server.js and press enter
5. On Command console window4, type mongo and press enter
   Complete these steps in window 4 (mongo shell) 
   5a. In mongo shell, type: show dbs
   5b. type: use my_dee_bee
   5c. type: db.questions.find() (SHOULD SHOW 5 QUESTIONS LOADED b/c of step 4)
   6d. type: db.questions.drop() MANDATORY/BEFORE AFTER EVERY RUN!!!
7. click on index.html and enjoy!

=========================   Notes/Comments   ==================================

* Must have two or more tabs open to play trivia game
* User who enters name and submit button first will see get question button and field
* Text field box is small, scroll right to see entire question
* WRONG and RIGHT field does not clear after each round (BUG)
* Database name is my_dee_bee




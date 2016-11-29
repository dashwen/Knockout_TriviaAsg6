/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */

var main = function () 
{ 
	'use strict';
	var url = 'http://localhost:3000/';
    var socket = io();
    var right = 0;
    var wrong = 0;
    var username;
    var rScore = 0;
    var wScore = 0;
    var ID = 0;

	var get = function () 
    {
        //getQuestion
        url += 'getQuestion';
        $.ajax(
        {
            url: url, 
            type: 'GET',
            data: '',
            success: function(data)
            {
                socket.emit('Question Received', data.question, data.id);
            }
        });
            
        url = 'http://localhost:3000/';              
	};

	var post = function (choice) 
    {
        //postQuestion
        if(choice === 1)
        {
            var newQuestion;
			var newAnswer;        	
        	url += 'postQuestion';

            newQuestion = $('#new-question').val();
            newAnswer = $('#new-answer').val();
            
            $.ajax(
            {
            	url: url, 
            	type: 'post',
                dataType: 'json',
                data: JSON.stringify({"question": newQuestion, "answer": newAnswer }),
                contentType: 'application/json',
                success: function(data)
                {
                    alert(data.success);
                }
            });
            
            url = 'http://localhost:3000/';
        }
        //postAnswer        
        else
        {
        	url += 'postAnswer';        	
        	var possibleAnswer;

            possibleAnswer = $('#possible-answer').val();
            
            $.ajax(
            {
            	url: url, 
            	type: 'post',
                dataType: 'json',
                data: JSON.stringify({"answer": possibleAnswer, "id": ID }),
                contentType: 'application/json',
                success: function(data)
                {
                    $('#result').val(data.result);
                    
                    if(data.result === "CORRECT!")
                    {
                        right += 1;
                    }
                    else
                    {
                        wrong += 1;
                    }
                    socket.emit('update score', right, wrong);
                }
            });
            
            url = 'http://localhost:3000/';
        }
	};

    //--------------- KNOCKOUT --------------------
    var viewModel = function (){
        var self = this;
        self.username = ko.observable("user123");   //listen for changes in the field
        
        self.loginVisible = ko.observable(true); //shown
        self.answerField = ko.observable(""); //answerfield for post answer

        self.isCorrect = ko.observable(""); //result field of post answer ex. RIGHT WRONG etc.
        self.questionField = ko.observable(""); //question field

        self.showHeaderDisplay = ko.observable(true);
        self.showAnswerQuestion = ko.observable(true);
        self.showPostQuestion = ko.observable(true);
        self.showRoundOver = ko.observable(true);

        // getQuestion event logic //
        self.getQuestionClick = function() {
            console.log("something is happening");
            get();

        }

        // post question event logic 
        self.postQuestionClick = function() {
            post(1);
            //$('.post-question input').val("");
        }

        // STEP 3 post answer event logic 
        self.postAnswerClick = function() {
            post(2);
            //$('#possible-answer').val("");
            self.answerField(""); //resets post answer field to empty string

        }

        //LOGIN page logic
        self.loginClick = function() {
            console.log("it workssss FINALLY!!!");
            console.log(self.username()); //this calls the observable and grabs the value editted in the text field
            
            self.isCorrect(""); //makes result box field empty
            self.questionField(""); //makes questionField box empty

            //if user response is 1, user is leader and able to grab the question, else, other users are not leaders and must wait
            //for leader to initiate get question
            socket.emit('join', self.username(), function (response) {
                if(response === '1')
                {
                    // -------------- THESE 4 when changed to knockout does not work, not sure why :(      --------------------

                    $('.container').show();
                    //self.containerVisible(true); //shown
                    $('.users').show();                    
                    $('.Start-Round').show();
                    $('.Update-Database').show();

                    // --------------------------------------------------------------------------------------------------------

                    //$('.login').hide();
                    self.loginVisible(false);
                    //$('.Header-Display').hide();
                    self.showHeaderDisplay(false);
                    //$('.Answer-Question').hide();
                    self.showAnswerQuestion(false);
                    //$('.post-question').hide();
                    self.showPostQuestion(false);  
                    //$('.Round-Over').hide();
                    self.showRoundOver(false);                  
                }
                else
                {
                    // -------------- THESE 4 when changed to knockout does not work, not sure why :(      --------------------

                    $('.container').show();
                    //self.containerVisible(true); //shown

                    $('.users').show();                    
                    $('.Get-Question').hide();
                    $('.Update-Database').hide();

                    // --------------------------------------------------------------------------------------------------------
                    
                    //$('.login').hide();
                    self.loginVisible(false);
                    //$('.Header-Display').hide();
                    self.showHeaderDisplay(false);
                    //$('.Answer-Question').hide();
                    self.showAnswerQuestion(false);
                    //$('.post-question').hide();
                    self.showPostQuestion(false);
                    //$('.Round-Over').hide();
                    self.showRoundOver(false);
                }
            });               
        }
    };
    ko.applyBindings(new viewModel());   //this makes KO work
    
    // ------------------------------ need to change to KO and we're done ----------------------------------------


    socket.on("update-people", function(users, rightArray, wrongArray)
    {
        $(".users").empty();
        var rArray = {};
        var wArray = {};
        //maybe we can keep the $.each instead of learning how to change to ko, not sure how it applies
        $.each(rightArray, function(clientid, rightScore) 
        {
             rArray[clientid] = rightScore;    
        });

        $.each(wrongArray, function(clientid, wrongScore) 
        {
            wArray[clientid] = wrongScore;
        });
        
        $.each(users, function(clientid, username) 
        {
            //change this to ko? not sure how on this either
            $('.users').append("<li>" + username + " score: " + " right: " + rArray[clientid] +  " wrong: " + wArray[clientid] + "</li>");    
        });         
    });
    socket.on('Question Received', function(question, id)
    {
        // change these to ko
        $('.Get-Question').show();
        $('.Answer-Question').show();
        $('#trivia-question').val(question);
        ID = id;        
    });
    socket.on('Game Over', function(question, id)
    {
        right = 0;
        wrong = 0;
        socket.emit('update score', right, wrong);

        //change these to ko
        $('.container').hide();
        $('.Header-Display').hide();
        $('.Round-Over').show();
    });

};

$(document).ready(main);

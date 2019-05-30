/**
 * @file
 * Contains js for the accordion example.
 */

window.app = window.app || {};

/*
 * SelfQuiz object
 */
window.app.selfquiz = {

	initialize : function(config) {
		config = config || {};
		this.debugFlag = config.debug || false;

		this.quiz = config.quizElement || $(".selfquiz");
		if (0 === this.quiz.length) {
			console.log('Quiz element not found');
			return;
		}
		this.buildQuiz();

		this.debug('selfquiz initialized');
	},

	buildQuiz : function() {
		this.debug('Quiz building start.');

		this.feedback = $('.feedback')
		this.hideFeedback();

		this.buildQuizQuestions();

		this.buildQuizSubmit();

		this.debug('Quiz building complete.');
	},

	buildQuizAnswer : function(i, element) {
		window.app.selfquiz.debug('Building answer ' + i);

		// What type of question are we building?
		type = $(element.closest('.answers')).attr('data-questiontype') || 'radio';

		// What question is this part of?
		question = $(element.closest('.question')).attr('data-question') || 'questionNULL';

		// Wrap a label around this list element.
		label = $(element.closest('li')).wrap('<label></label>');

		// Build the form input.
		control = document.createElement('input');
		$(control).attr('type', type);
		$(control).attr('name', question);
		$(control).attr('value', element.innerHTML);
		element.prepend(control);
	},

	buildQuizQuestions : function() {
		this.debug('2. Building questions');
		this.questions = $('.question');
		this.debug('  ' + this.questions.length + ' questions found');
		this.questions.map(this.decorateQuestion);

		this.answers = $('li');
		this.debug('  ' + this.answers.length + ' answers found');
		this.answers.map(this.buildQuizAnswer);
	},

	buildQuizSubmit : function() {
		this.debug('2. Building submit button...');
		submit = document.createElement('div');
		$(submit).attr("class","submit");
		$(submit).append('<button type="button">Grade quiz</button>')
		submit.addEventListener('click', this.gradeQuiz);
		this.quiz.append(submit);
	},

	decorateQuestion : function(i, element) {
		window.app.selfquiz.debug('Decorating question ' + i);
		$(element).attr('data-question', 'question'+i);
	},

	gradeQuiz : function() {
		window.app.selfquiz.debug('Grading requested...');
		questions = window.app.selfquiz.questions;
		points = 0;
		// TODO make this not a loop.
		for (i = 0; i < questions.length; i++) {
			type = $(questions[i]).find('.answers').attr('data-questiontype');
			window.app.selfquiz.debug('Counting ' + type);

			if ( 'radio' === type ) {
				// TODO make this its own method
				answer = $(window.app.selfquiz.questions[i]).find('input:checked').val();
				correct = $(window.app.selfquiz.questions[i]).find('li[data-status="correct"]').text();
				if ( answer === correct ) {
					window.app.selfquiz.debug('Q' + i + ': correct');
					points++;
				} else {
					window.app.selfquiz.debug('Q' + i + ': Got ' + answer + ', expected ' + correct);
				}
			} else if ( 'checkbox' === type ) {
				// TODO build array of values for both of these.
				answer = typeof($(window.app.selfquiz.questions[i]).find('input:checked'));
				correct = $(window.app.selfquiz.questions[i]).find('li[data-status="correct"]').text();
				if ( answer === correct ) {
					window.app.selfquiz.debug('Q' + i + ': correct');
					points++;
				} else {
					window.app.selfquiz.debug('Q' + i + ': Got ' + answer + ', expected ' + correct);
				}
			}
			// TODO count differently if radio or checkboxes
			// checkbox - get values, compare to data attributes. total matches, divide by total expected.
		}
		window.app.selfquiz.points = points
		window.app.selfquiz.showScore();
		window.app.selfquiz.showFeedback();
		window.app.selfquiz.markAnswers();
	},

	hideFeedback : function() {
		window.app.selfquiz.debug('1. Hiding feedback');
		window.app.selfquiz.feedback.addClass('hidden');
	},

	markAnswers : function() {
		correct = $(window.app.selfquiz.questions).find('li[data-status="correct"]');
		answers = $(window.app.selfquiz.questions).find('input:checked').closest('li');
		for (i = 0; i < answers.length; i++) {
			status = $(answers[i]).attr('data-status');
			if ( 'correct' != status ) {
				$(answers[i]).addClass('wrong');
				$(answers[i]).append(' - Incorrect');
			}
		}
		incorrect = $(answers).attr
		correct.addClass('correct');
		correct.append(' - Correct');
	},

	showFeedback : function() {
		window.app.selfquiz.debug('Showing feedback...');
		window.app.selfquiz.feedback.removeClass('hidden');
	},

	showScore : function() {
		points = window.app.selfquiz.points || 0;
		window.app.selfquiz.debug('Showing score...');
		score = document.createElement('div');
		$(score).attr('class','score');
		score.append('Your score: ' + points + ' of ' + window.app.selfquiz.questions.length);
		window.app.selfquiz.quiz[0].prepend(score);
	},

	debug : function(msg) {
		if (this.debugFlag) {
			console.log(msg);
		}
	}
}
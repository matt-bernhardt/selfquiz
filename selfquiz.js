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
		window.app.selfquiz.showFeedback();
	},

	hideFeedback : function() {
		window.app.selfquiz.debug('1. Hiding feedback');
		window.app.selfquiz.feedback.addClass('hidden');
	},

	showFeedback : function() {
		window.app.selfquiz.debug('Showing feedback...');
		window.app.selfquiz.feedback.removeClass('hidden');
	},

	debug : function(msg) {
		if (this.debugFlag) {
			console.log(msg);
		}
	}
}
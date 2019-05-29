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

		this.debug('2. Building questions');
		this.questions = $('li');
		this.debug('  ' + this.questions.length + ' questions found');


		this.buildQuizSubmit();

		this.debug('Quiz building complete.');
	},

	buildQuizSubmit : function() {
		this.debug('2. Building submit button...');
		submit = document.createElement('div');
		$(submit).attr("class","submit");
		$(submit).append('<button type="button">Grade quiz</button>')
		submit.addEventListener('click', this.gradeQuiz);
		this.quiz.append(submit);
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
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
		this.debug('1. Building questions');
		questions = $('li');
		this.debug('  ' + questions.length + ' questions found');
		this.debug('2. Building submit button...');
		submit = document.createElement('div');
		$(submit).attr("class","submit");
		$(submit).append('<button type="button">Grade quiz</button>')
		submit.addEventListener('click', this.gradeQuiz);
		this.quiz.append(submit);
		this.debug('Quiz building complete.');
	},

	gradeQuiz : function() {
		window.app.selfquiz.debug('Grading requested...');
	},

	debug : function(msg) {
		if (this.debugFlag) {
			console.log(msg);
		}
	}
}
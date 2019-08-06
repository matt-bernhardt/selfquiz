/**
 * @file
 * Contains js for the accordion example.
 */

window.app = window.app || {};

/*
 * SelfQuiz object
 */
window.app.selfquiz = {

	version: '1.0.0',

	initialize : function(config) {
		config = config || {};
		this.debugFlag = config.debug || false;

		this.quizElement = config.quizElement || '.selfquiz';
		this.quiz = jQuery(this.quizElement);
		if (0 === this.quiz.length) {
			console.log('Quiz element not found');
			return;
		}
		this.buildQuiz();

		this.debug('selfquiz initialized');
	},

	buildQuiz : function() {
		this.debug('Quiz building start.');

		this.feedback = jQuery('.feedback')
		this.hideFeedback();

		this.buildQuizQuestions();

		this.buildQuizSubmit();

		this.debug('Quiz building complete.');
	},

	buildQuizAnswer : function(i, element) {
		window.app.selfquiz.debug('Building answer ' + i);

		// What type of question are we building?
		type = jQuery(element.closest('.answers')).attr('data-questiontype') || 'radio';
		if(type !== 'checkbox') { type = 'radio'; }

		// What question is this part of?
		question = jQuery(element.closest('.question')).attr('data-question') || 'questionNULL';

		// Wrap a label around this list element.
		label = jQuery(element.closest('li')).wrap('<label></label>');

		// Build the form input.
		control = document.createElement('input');
		jQuery(control).attr('type', type);
		jQuery(control).attr('name', question);
		jQuery(control).attr('value', element.innerHTML);
		element.prepend(control);
	},

	buildQuizQuestions : function() {
		this.debug('2. Building questions');
		this.questions = jQuery('.question');
		this.debug('  ' + this.questions.length + ' questions found');
		this.questions.map(this.decorateQuestion);

		this.answers = jQuery('.question li');
		this.debug('  ' + this.answers.length + ' answers found');
		this.answers.map(this.buildQuizAnswer);
	},

	buildQuizSubmit : function() {
		this.debug('2. Building submit button...');
		submit = document.createElement('div');
		jQuery(submit).attr("class","submit");
		jQuery(submit).append('<button type="button">Grade quiz</button>')
		submit.addEventListener('click', this.gradeQuiz);
		this.quiz.append(submit);
	},

	decorateQuestion : function(i, element) {
		window.app.selfquiz.debug('Decorating question ' + i);
		jQuery(element).attr('data-question', 'question'+i);
	},

	gradeQuiz : function() {
		window.app.selfquiz.debug('Grading requested...');
		questions = window.app.selfquiz.questions;
		points = 0;
		// TODO make this not a loop.
		for (i = 0; i < questions.length; i++) {
			type = jQuery(questions[i]).find('.answers').attr('data-questiontype');
			window.app.selfquiz.debug('Counting ' + type);

			if ( 'radio' === type ) {
				window.app.selfquiz.gradeQuizRadio();
			} else if ( 'multi-radio' === type ) {
				window.app.selfquiz.gradeQuizMultiRadio();
			} else if ( 'checkbox' === type ) {
				window.app.selfquiz.gradeQuizCheckbox();
			}
			// TODO count differently if radio or checkboxes
			// checkbox - get values, compare to data attributes. total matches, divide by total expected.
		}
		window.app.selfquiz.points = points
		window.app.selfquiz.showScore();
		window.app.selfquiz.showFeedback();
		window.app.selfquiz.markAnswers();
	},

	gradeQuizCheckbox : function() {
		// TODO build array of values for both of these.
		answer = jQuery(window.app.selfquiz.questions[i]).find('input:checked');
		answerLength = answer.length;
		answerText = "";
		for (j = 0; j < answer.length; j++) {
			answerText += jQuery(answer[j]).val();
		}

		// This ends with a concatenated list of correct answers. So both "Foo" and "Bar" will result in "FooBar"
		correct = jQuery(window.app.selfquiz.questions[i]).find('li[data-status="correct"]').find('input');
		correctLength = correct.length;
		correctText = "";
		for (j = 0; j < correct.length; j++) {
			correctText += jQuery(correct[j]).val();
		}

		if ( answerLength === correctLength && answerText === correctText ) {
			window.app.selfquiz.debug('Q' + i + ': correct');
			points++;
		} else {
			window.app.selfquiz.debug('Q' + i + ': Got ' + answerText + ', expected ' + correctText);
		}
	},

	gradeQuizMultiRadio : function() {
		answer = jQuery(window.app.selfquiz.questions[i]).find('input:checked').val();
		correct = jQuery(window.app.selfquiz.questions[i]).find('li[data-status="correct"]').text();
		if ( correct.includes(answer) ) {
			window.app.selfquiz.debug('Q' + i + ': correct');
			points++;
		} else {
			window.app.selfquiz.debug('Q' + i + ': Got ' + answer + ', which is not in ' + correct);
		}
	},

	gradeQuizRadio : function() {
		answer = jQuery(window.app.selfquiz.questions[i]).find('input:checked').val();
		correct = jQuery(window.app.selfquiz.questions[i]).find('li[data-status="correct"]').text();
		if ( answer === correct ) {
			window.app.selfquiz.debug('Q' + i + ': correct');
			points++;
		} else {
			window.app.selfquiz.debug('Q' + i + ': Got ' + answer + ', expected ' + correct);
		}
	},

	hideFeedback : function() {
		window.app.selfquiz.debug('1. Hiding feedback');
		window.app.selfquiz.feedback.addClass('hidden');
	},

	markAnswers : function() {
		correct = jQuery(window.app.selfquiz.questions).find('li[data-status="correct"]');
		answers = jQuery(window.app.selfquiz.questions).find('input:checked').closest('li');
		for (i = 0; i < answers.length; i++) {
			status = jQuery(answers[i]).attr('data-status');
			if ( 'correct' != status ) {
				jQuery(answers[i]).addClass('wrong');
				jQuery(answers[i]).append(' - Incorrect');
			}
		}
		incorrect = jQuery(answers).attr
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
		jQuery(score).attr('class','score');
		score.append('Your score: ' + points + ' of ' + window.app.selfquiz.questions.length);
		window.app.selfquiz.quiz[0].prepend(score);
	},

	debug : function(msg) {
		if (this.debugFlag) {
			console.log(msg);
		}
	}
}

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '/'
    }
});

// Start the main app logic.
requirejs(['knockout', 'jquery'],
function (ko, $) {

	function viewModel() {
	    $("body").show();
	    var self = this;

		var keys = ['currentAgeWeeks', 'currentAgeMonths', 'currentAgeYears', 'currentAgeDays'];

		self.currentAgeDays = ko.observable();
		self.currentAgeWeeks = ko.observable();
		self.currentAgeMonths = ko.observable();
		self.currentAgeYears = ko.observable();
		self.currentChangedValue = ko.observable();
		self.birthdate = ko.observable();
		self.daysSinceLastMeasurement = ko.observable();
		self.adjustedAge = ko.observable();
		self.currentLengthCm = ko.observable();
		self.currentLengthIn = ko.observable();
		self.previousLengthCm = ko.observable();
		self.previousLengthIn = ko.observable();

		function monthDiff(birthDate, currentDate) {
			var months;
			var yearDiff = yeardiff(birthDate, currentDate);

			months = yearDiff * 12;

			return months <= 0 ? 0 : months;
		}

		function daydiff(birthDate, currentDate) {
			var days = Math.round((currentDate-birthDate)/(1000*60*60*24));

			return days <= 0 ? 0 : days;
		}

		function weekdiff(birthDate, currentDate) {
			var daysDiff = daydiff(birthDate, currentDate);

			return daysDiff/7;
		}

		function yeardiff(birthDate, currentDate) {
			return daydiff(birthDate, currentDate)/365;
		}

		// 1 cm = 0.393701 inches
		function convertInToCm(inches) {
			return (inches*2.54).toFixed(2);
		}

		function convertCmToIn(cm) {
			return (cm*.393701).toFixed(2);
		}

		ko.bindingHandlers.calculateAge = {
			update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
				// This will be called once when the binding is first applied to an element,
				// and again whenever any observables/computeds that are accessed change
				// Update the DOM element based on the supplied values here.
				var key = valueAccessor();
				var value = element.value;
				if (key == '' || value == '' || value.indexOf("0") === 0) return true;

				var currentDate = new Date();
				var birthDate = new Date(value);

				var diffMonths = monthDiff(birthDate, currentDate);
				var diffWeeks = weekdiff(birthDate, currentDate);
				var diffDays = daydiff(birthDate, currentDate);
				var diffYears = yeardiff(birthDate, currentDate);
				self.currentAgeDays(diffDays.toFixed(2));
				self.currentAgeWeeks(diffWeeks.toFixed(2));
				self.currentAgeMonths(diffMonths.toFixed(2));
				self.currentAgeYears(diffYears.toFixed(2));
			}
		};

		ko.bindingHandlers.calculateLength = {
			update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
				// This will be called once when the binding is first applied to an element,
				// and again whenever any observables/computeds that are accessed change
				// Update the DOM element based on the supplied values here.
				var key = valueAccessor();
				var value = element.value;
				if (key == '' || value == '' || isNaN(value)) return true;

				if (key == 'currentLengthCm') {
					self.currentLengthIn(convertCmToIn(value));
				} else if (key == 'currentLengthIn') {
					self.currentLengthCm(convertInToCm(value));
				} else if (key == 'previousLengthCm') {
					self.previousLengthIn(convertCmToIn(value));
				} else if (key == 'previousLengthIn') {
					self.previousLengthCm(convertInToCm(value));
				}
			}
		};
	};

	ko.applyBindings(new viewModel());
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});
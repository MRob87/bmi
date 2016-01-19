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
		// for weight calc
		ko.observable.fn.withPausing = function() {
			this.notifySubscribers = function() {
				if (!this.pauseNotifications) {
					ko.subscribable.fn.notifySubscribers.apply(this, arguments);
				}
			};

			this.sneakyUpdate = function(newValue) {
				this.pauseNotifications = true;
				this(newValue);
				this.pauseNotifications = false;
			};

			return this;
		};

	    $("body").show();
	    var self = this;

		var keys = ['currentAgeWeeks', 'currentAgeMonths', 'currentAgeYears', 'currentAgeDays'];

		// birthday - age
		self.currentAgeDays = ko.observable();
		self.currentAgeWeeks = ko.observable();
		self.currentAgeMonths = ko.observable();
		self.currentAgeYears = ko.observable();
		self.currentChangedValue = ko.observable();
		self.birthdate = ko.observable();
		// custom
		self.daysSinceLastMeasurement = ko.observable();
		self.adjustedAge = ko.observable();
		// length
		self.currentLengthCm = ko.observable();
		self.currentLengthIn = ko.observable();
		self.previousLengthCm = ko.observable();
		self.previousLengthIn = ko.observable();
		// weight
		self.currentWeightOzs = ko.observable().withPausing();
		self.currentWeightLbs = ko.observable().withPausing();
		self.currentWeightKg = ko.observable().withPausing();
		self.previousWeightOzs = ko.observable().withPausing();
		self.previousWeightLbs = ko.observable().withPausing();
		self.previousWeightKg = ko.observable().withPausing();
		// calculated values
		self.gramsPerKiloPerDay = ko.observable();

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

		function convertInToCm(inches) {
			return (inches*2.54).toFixed(2);
		}

		function convertCmToIn(cm) {
			return (cm*.393701).toFixed(2);
		}

		function convertKgToLbs(kg) {
			return Math.floor((kg * 2.205));
		}

		function convertOzsToLbs (ozs) {
			return Math.floor(ozs*0.0625).toFixed(0);
		}

		function convertKgToOzs(kg) {
			return (kg * 35.274).toFixed(2);
		}

		function convertOzToKg(oz) {
			return (oz / 35.274).toFixed(2);
		}

		function convertLbsToOzs(lbs) {
			return (lbs * 16).toFixed(2);
		}

		function convertKgToLbsOzs(kg) {
			var ozs = convertKgToOzs(kg);

			// round down to get the remainder of ozs
			var lbs = convertOzsToLbs(ozs);

			var lbsozs = (ozs - convertLbsToOzs(lbs)).toFixed(2);

			return lbs + '-' + lbsozs;
		}

		function convertLbsOzsToKg(key, value, weightOzs, weightLbs) {
			var ozs = 0;
			if (key == 'currentWeightLbs' || key == 'previousWeightLbs') {
				ozs = convertLbsToOzs(value);
				if (!isNaN(weightOzs)) {
					ozs = parseInt(ozs) + parseInt(weightOzs);
				}
			} else if (key == 'currentWeightOzs' || key == 'previousWeightOzs') {
				ozs = convertLbsToOzs(weightLbs);
				if (!isNaN(value)) {
					ozs = parseInt(ozs) + parseInt(value);
				}
			}

			return convertOzToKg(ozs);
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

		var currentWeightKgCount = 0;
		var currentWeightLbsOzsCount = 0;
		var previousWeightKgCount = 0;
		var previousWeightLbsOzsCount = 0;
		ko.bindingHandlers.calculateWeight = {
			update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
				// This will be called once when the binding is first applied to an element,
				// and again whenever any observables/computeds that are accessed change
				// Update the DOM element based on the supplied values here.
				var key = valueAccessor();
				var value = element.value;
				if (key == '' || value == '' || isNaN(value)) return true;

				// CURRENT
				if (key == 'currentWeightKg' && currentWeightLbsOzsCount == 0) {
					currentWeightKgCount++;
					var lbsozs = convertKgToLbsOzs(value);
					var arLbsOzs = lbsozs.split('-');
					self.currentWeightOzs(arLbsOzs[1]);
					self.currentWeightLbs(arLbsOzs[0]);
					currentWeightLbsOzsCount = 0;
				} else if (key == 'currentWeightKg' && currentWeightLbsOzsCount > 0 && currentWeightKgCount == 0) {
					currentWeightLbsOzsCount = 0;
				} else if ((key == 'currentWeightLbs' || key == 'currentWeightOzs') && currentWeightLbsOzsCount <= 1) {
					currentWeightLbsOzsCount++;
					self.currentWeightKg(convertLbsOzsToKg(key, value, self.currentWeightOzs(), self.currentWeightLbs()));
					currentWeightKgCount = 0;
				} else if ((key == 'currentWeightLbs' || key == 'currentWeightOzs') && currentWeightKgCount > 0) {
					currentWeightKgCount = 0;
				} // PREVIOUS
				else if (key == 'previousWeightKg' && previousWeightLbsOzsCount == 0) {
					previousWeightKgCount++;
					var lbsozs = convertKgToLbsOzs(value);
					var arLbsOzs = lbsozs.split('-');
					self.previousWeightOzs(arLbsOzs[1]);
					self.previousWeightLbs(arLbsOzs[0]);
					previousWeightLbsOzsCount = 0;
				} else if (key == 'previousWeightKg' && previousWeightLbsOzsCount > 0 && previousWeightKgCount == 0) {
					previousWeightLbsOzsCount = 0;
				} else if ((key == 'previousWeightLbs' || key == 'previousWeightOzs') && previousWeightLbsOzsCount <= 1) {
					previousWeightLbsOzsCount++;
					self.previousWeightKg(convertLbsOzsToKg(key, value, self.previousWeightOzs(), self.previousWeightLbs()));
					previousWeightKgCount = 0;
				} else if ((key == 'previousWeightLbs' || key == 'previousWeightOzs') && previousWeightKgCount > 0) {
					previousWeightKgCount = 0;
				}
			}
		};

		self.currentWeightKg.subscribe(function(currentWeightKg) {
			var gramsPerKiloPerDay = parseInt(calculateGramsPerKiloPerDay(currentWeightKg, self.previousWeightKg(), self.daysSinceLastMeasurement()));
			if (!isNaN(gramsPerKiloPerDay)) {
				self.gramsPerKiloPerDay(gramsPerKiloPerDay);
			}
		});

		self.previousWeightKg.subscribe(function(previousWeightKg) {
			var gramsPerKiloPerDay = parseInt(calculateGramsPerKiloPerDay(self.currentWeightKg(), previousWeightKg, self.daysSinceLastMeasurement()));
			if (!isNaN(gramsPerKiloPerDay)) {
				self.gramsPerKiloPerDay(gramsPerKiloPerDay);
			}
		});

		// (currentWeightKg - previousWeightKg) * 1000 / numberOfDaysSinceLast, (currentWeightLb - previousWeightLb)
		function calculateGramsPerKiloPerDay(currentWeight, previousWeight, daysSinceLastMeasurement) {
			return ((currentWeight - previousWeight) * 1000) / daysSinceLastMeasurement;
		}
	};

	ko.applyBindings(new viewModel());
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});
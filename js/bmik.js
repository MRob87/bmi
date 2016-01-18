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

		function monthDiff(birthDate, currentDate) {
			var birthMonth = birthDate.getUTCMonth();
			var birthYear = birthDate.getUTCFullYear();
			var currentMonth = currentDate.getUTCMonth();
			var currentYear = currentDate.getUTCFullYear();

			var months;
			var yearDiff = yeardiff(birthDate, currentDate);

			months = yearDiff * 12;
			//var days = daydiff(birthDate, currentDate) - (months * yearDiff);

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

		//self.currentAgeDays.subscribe(function(currentAgeDays) {
		//	for (var i in keys) {
		//		if (keys[i] != self.currentChangedValue()) {
		//			if (keys[i] == 'currentAgeWeeks') {
		//				$("#" + keys[i]).val((currentAgeDays/7).toFixed(6));
		//			} else if (keys[i] == 'currentAgeMonths') {
		//				$("#" + keys[i]).val((currentAgeDays/30).toFixed(6));
		//			} else if (keys[i] == 'currentAgeYears') {
		//				$("#" + keys[i]).val((currentAgeDays/365).toFixed(6));
		//			}
		//		}
		//	}
		//});

		//ko.bindingHandlers.calculateAge = {
		//	update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		//		// This will be called once when the binding is first applied to an element,
		//		// and again whenever any observables/computeds that are accessed change
		//		// Update the DOM element based on the supplied values here.
		//		var key = valueAccessor();
		//		var value = element.value;
		//		if (key == '' || value == '' || isNaN(value)) return true;
		//		var currentAgeDays = 0;
		//		if (key == 'currentAgeWeeks') {
		//			currentAgeDays = value * 7;
		//		} else if (key == 'currentAgeMonths') {
		//			currentAgeDays = value * 30;
		//		} else if (key == 'currentAgeYears') {
		//			currentAgeDays = value * 365;
		//		}
		//		console.log('for ' + key + ' of ' + $("#" + key).val() + ', currentAgeDays is ' + currentAgeDays);
        //
		//		self.currentChangedValue(key);
		//		self.currentAgeDays(currentAgeDays);
		//	}
		//};

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
					//debugger;

					//console.log('for ' + key + ' of ' + $("#" + key).val() + ', currentAgeDays is ' + currentAgeDays);

					//self.currentChangedValue(key);
					//self.currentAgeDays(currentAgeDays);
					self.currentAgeDays(diffDays.toFixed(2));
					self.currentAgeWeeks(diffWeeks.toFixed(2));
					self.currentAgeMonths(diffMonths.toFixed(2));
					self.currentAgeYears(diffYears.toFixed(2));
				}
			};

		//this.calculateAgeEvent = function(key, data, event) {
        //
		//	debugger;
		//	var currentAgeDays = 0;
		//	if (key == 'currentAgeWeeks') {
		//		currentAgeDays = $("#" + key).val() * 7;
		//	} else if (key == 'currentAgeMonths') {
		//		currentAgeDays = $("#" + key).val() * 30;
		//	} else if (key == 'currentAgeYears') {
		//		currentAgeDays = $("#" + key).val() * 365;
		//	}
		//	console.log('for ' + key + ' of ' + $("#" + key).val() + ', currentAgeDays is ' + currentAgeDays);
        //
		//	self.currentChangedValue(key);
		//	self.currentAgeDays(currentAgeDays);
        //
		//	return true;
		//};
	};

	ko.applyBindings(new viewModel());
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});
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

		self.currentAgeDays.subscribe(function(currentAgeDays) {
			for (var i in keys) {
				if (keys[i] != self.currentChangedValue()) {
					if (keys[i] == 'currentAgeWeeks') {
						$("#" + keys[i]).val((currentAgeDays/7).toFixed(2));
					} else if (keys[i] == 'currentAgeMonths') {
						$("#" + keys[i]).val((currentAgeDays/30).toFixed(2));
					} else if (keys[i] == 'currentAgeYears') {
						$("#" + keys[i]).val((currentAgeDays/365).toFixed(2));
					}
				}
			}
		});

		this.calculateAgeEvent = function(key, data, event) {

			var currentAgeDays = 0;
			if (key == 'currentAgeWeeks') {
				currentAgeDays = $("#" + key).val() * 7;
			} else if (key == 'currentAgeMonths') {
				currentAgeDays = $("#" + key).val() * 30;
			} else if (key == 'currentAgeYears') {
				currentAgeDays = $("#" + key).val() * 365;
			}

			self.currentChangedValue(key);
			self.currentAgeDays(currentAgeDays);

			return true;
		};
	};

	ko.applyBindings(new viewModel());
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});
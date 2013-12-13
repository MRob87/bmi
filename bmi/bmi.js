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
	    
	    this.heightFtIn = ko.observable('5-11');
	    this.heightFt = ko.observable(0);
	    this.heightIn = ko.observable(0);
	    this.heightCm = ko.observable(0);
	    this.heightTotalIn = ko.observable(0);
	    this.weightLb = ko.observable(150);
	    this.weightKg = ko.observable(0);
	    this.bmi = ko.observable(0);
	    this.age = ko.observable(26);
	    this.sex = ko.observable('M');
//	    this.maleBmr = ko.observable(0);
//	    this.femaleBmr = ko.observable(0);
	    
	    this.populateHeightValues = function(heightFtIn) {
	    	if (heightFtIn != 0) {
		    	if (heightFtIn.indexOf('-')) {
		    		var heightFtIn = heightFtIn.split('-');
		    		var heightFt = parseInt(heightFtIn[0]);
		    		var heightIn = parseInt(heightFtIn[1]);
		    		var heightTotalIn = (heightFt*12)+heightIn;
		    		var heightCm = heightTotalIn * 2.54;
		    		
		    		self.heightFt(heightFt);
		    		self.heightIn(heightIn);
		    		self.heightTotalIn(heightTotalIn);
		    		self.heightCm(heightCm);
		    	}
	    	}
	    };
	    
    	this.populateHeightValues(this.heightFtIn());
	    
	    self.heightFtIn.subscribe(function(heightFtIn) {
	    	self.populateHeightValues(heightFtIn);
	    });
	    
//	    self.heightTotalIn.subscribe(function(heightTotalIn) {
//	    	var heightFt = Math.floor(heightTotalIn / 12);
//	    	var heightIn = heightTotalIn % 12;
//	    	self.heightFt(heightFt);
//	    	self.heightIn(heightIn);
//	    	self.heightFtIn(heightFt+'-'+heightIn);
//	    });
	    
	    self.weightKg = ko.computed(function() {
		    var weightKg = self.weightLb() * 0.453592;
			return weightKg.toFixed(0);
	    });

	    self.calculateBmi = ko.computed(function() {
	    	if (self.heightTotalIn() > 0 && self.weightLb() > 0) {
		    	var bmi = 0;
		    	var heightSquared = self.heightTotalIn()*self.heightTotalIn();
		    	
		    	bmi = (self.weightLb()/heightSquared)*703;
		    	
		    	self.bmi(bmi.toFixed(4));
	    	}
	    });
	    
	    self.maleRee = ko.computed(function() {
	    	if (self.weightKg() != 0 && self.heightCm() != 0 && self.age() != 0) {
	    		var maleBmr = (10 * self.weightKg()) + (6.25 * self.heightCm()) - (5 * self.age()) + 5;
	    		return maleBmr.toFixed(0);
	    	}
	    });
	    
	    self.femaleRee = ko.computed(function() {
	    	if (self.weightKg() && self.heightCm) {
	    		var femaleBmr = 10 * self.weightKg() + 6.25 * self.heightCm() - 5 * self.age() - 161;
	    		return femaleBmr.toFixed(0);
	    	}
	    });
	    
	    self.maleActivityFactor2 = ko.computed(function() {
	    	var maleActivityFactor2 = self.maleRee() * 1.2;
	    	return maleActivityFactor2.toFixed(0);
	    });
	    
	    self.maleActivityFactor3 = ko.computed(function() {
	    	var maleActivityFactor3 = self.maleRee() * 1.3;
	    	return maleActivityFactor3.toFixed(0);
	    });
	    
	    self.maleActivityFactor4 = ko.computed(function() {
	    	var maleActivityFactor4 = self.maleRee() * 1.4;
	    	return maleActivityFactor4.toFixed(0);
	    });
	    
	    self.femaleActivityFactor2 = ko.computed(function() {
	    	var femaleActivityFactor2 = self.femaleRee() * 1.2;
	    	return femaleActivityFactor2.toFixed(0);
	    });
	    
	    self.femaleActivityFactor3 = ko.computed(function() {
	    	var femaleActivityFactor3 = self.femaleRee() * 1.3;
	    	return femaleActivityFactor3.toFixed(0);
	    });
	    
	    self.femaleActivityFactor4 = ko.computed(function() {
	    	var femaleActivityFactor4 = self.femaleRee() * 1.4;
	    	return femaleActivityFactor4.toFixed(0);
	    });
	    
	    self.proteinNeed1 = ko.computed(function() {
	    	var proteinNeed1 = self.weightKg() * 0.8;
	    	return proteinNeed1.toFixed(0);
	    });
	    
	    self.proteinNeed3 = ko.computed(function() {
	    	var proteinNeed3 = self.weightKg() * 1.2;
	    	return proteinNeed3.toFixed(0);
	    });
	    
	    self.proteinNeed4 = ko.computed(function() {
	    	var proteinNeed4 = self.weightKg() * 1.5;
	    	return proteinNeed4.toFixed(0);
	    });
	};

	ko.applyBindings(new viewModel());
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});
<!DOCTYPE html>
<html>
    <head>
        <title>For the Children</title>
        <!-- data-main attribute tells require.js to load
             scripts/main.js after require.js loads. -->
        <script data-main="js/bmik.js" src="/js/require.js"></script>
        <script type="text/javascript">
	        
        </script>
		<link rel="stylesheet" href="styles/default.css">
    </head>
    <body>
	<h2>For the Children</h2>
    	<!-- conversions -->
    	<table id="mainTable">
	    	<tr>
	    		<td colspan=5 class="tableHeader">Age
					<br/>
					<input onfocus="this.value=''" type="date" id="birthdate" class="dateInput" data-bind="value: birthdate, valueUpdate: 'afterkeydown', calculateAge: 'birthdate'">
					<br />
					<br />
				</td>
			</tr>
		</table>
		<table id="resultsTable">
			<tr>
				<td>Weeks</td>
				<td rowspan="2" class="equalsSign">=</td>
				<td>Months</td>
				<td rowspan="2" class="equalsSign">=</td>
				<td>Years</td>
			</tr>
			<tr>
				<td class="calculateResults">
					<b><span data-bind="text: currentAgeWeeks"></span></b>
					<!-- ko ifnot: currentAgeWeeks -->
					--
					<!-- /ko -->
				</td>
				<td class="calculateResults">
					<b><span data-bind="text: currentAgeMonths"></span></b>
					<!-- ko ifnot: currentAgeWeeks -->
					--
					<!-- /ko -->
				</td>
				<td class="calculateResults">
					<b><span data-bind="text: currentAgeYears"></span></b>
					<!-- ko ifnot: currentAgeWeeks -->
					--
					<!-- /ko -->
				</td>
			</tr>
    	</table>
		<table id="measurementTable">
			<tr>
				<td>
					Days Since Last Measurement:
				</td><td>
					<input onfocus="this.value=''" type="text" class="smallInput" data-bind="value: daysSinceLastMeasurement, valueUpdate: 'afterkeydown'">
				</td><td>
					&nbsp;
				</td><td>
					&nbsp;
				</td>
			</tr>
			<tr>
				<td>
					Adjusted Age:
				</td><td>
					<input onfocus="this.value=''" type="date" class="dateInput" data-bind="value: adjustedAge, valueUpdate: 'afterkeydown'">
				</td><td>
					&nbsp;
				</td><td>
					&nbsp;
				</td>
			</tr>
			<tr>
				<td colspan="4" class="lineBreaker">Length</td>
			</tr>
			<tr>
				<td>
					Current Length (cm):
				</td><td>
					<input onfocus="this.value=''" type="text" id="currentLengthCm" class="smallInput" data-bind="value: currentLengthCm, valueUpdate: 'afterkeydown', calculateLength: 'currentLengthCm'">
				</td><td>
					Previous Length (cm):
				</td><td>
					<input onfocus="this.value=''" type="text" id="previousLengthCm" class="smallInput" data-bind="value: previousLengthCm, valueUpdate: 'afterkeydown', calculateLength: 'previousLengthCm'">
				</td>
			</tr>
			<tr>
				<td>
					Current Length (in):
				</td><td>
					<input onfocus="this.value=''" type="text" id="currentLengthIn" class="smallInput" data-bind="value: currentLengthIn, valueUpdate: 'afterkeydown', calculateLength: 'currentLengthIn'">
				</td><td>
					Previous Length (in):
				</td><td>
					<input onfocus="this.value=''" type="text" id="previousLengthIn" class="smallInput" data-bind="value: previousLengthIn, valueUpdate: 'afterkeydown', calculateLength: 'previousLengthIn'">
				</td>
			</tr>
			<tr>
				<td colspan="4" class="lineBreaker">Weight</td>
			</tr>
			<tr>
				<td>
					Current Weight (kg):
				</td><td>
					<input onfocus="this.value=''" type="text" id="currentWeightKg" class="smallInput" data-bind="value: currentWeightKg, valueUpdate: 'afterkeydown', calculateWeight: 'currentWeightKg'">
				</td><td>
					Previous Weight (kg):
				</td><td>
					<input onfocus="this.value=''" type="text" id="previousWeightKg" class="smallInput" data-bind="value: previousWeightKg, valueUpdate: 'afterkeydown', calculateWeight: 'previousWeightKg'">
				</td>
			</tr>
			<tr>
				<td>
					Current Weight (lbs & ozs):
				</td><td>
					<input onfocus="this.value=''" type="text" id="currentWeightLbs" class="smallInput" data-bind="value: currentWeightLbs, valueUpdate: 'afterkeydown', calculateWeight: 'currentWeightLbs'">
					<input onfocus="this.value=''" type="text" id="currentWeightOzs" class="smallInput" data-bind="value: currentWeightOzs, valueUpdate: 'afterkeydown', calculateWeight: 'currentWeightOzs'">
				</td><td>
					Previous Weight (lbs & ozs):
				</td><td>
					<input onfocus="this.value=''" type="text" id="previousWeightLbs" class="smallInput" data-bind="value: previousWeightLbs, valueUpdate: 'afterkeydown', calculateWeight: 'previousWeightLbs'">
					<input onfocus="this.value=''" type="text" id="previousWeightOzs" class="smallInput" data-bind="value: previousWeightOzs, valueUpdate: 'afterkeydown', calculateWeight: 'previousWeightOzs'">
				</td>
			</tr>
			<tr>
				<td>Grams per Kilograms Per Day</td>
				<td><span data-bind="text: gramsPerKiloPerDay"></span></td>
			</tr>
		</table>
    </body>
</html>
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
					<input type="date" id="birthdate" class="dateInput" data-bind="value: birthdate, valueUpdate: 'afterkeydown', calculateAge: 'birthdate'">
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
					<input type="text" class="smallInput" data-bind="value: daysSinceLastMeasurement, valueUpdate: 'afterkeydown'">
				</td><td>
					--
				</td><td>
					--
				</td>
			</tr>
			<tr>
				<td>
					Adjusted Age:
				</td><td>
					<input type="date" class="dateInput" data-bind="value: adjustedAge, valueUpdate: 'afterkeydown'">
				</td><td>
					--
				</td><td>
					--
				</td>
			</tr>
		</table>
    </body>
</html>
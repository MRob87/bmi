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
				</td>
			</tr>
			<tr>
				<td>Weeks</td>
				<td>=</td>
				<td>Months</td>
				<td>=</td>
				<td>Years</td>
			</tr>
			<tr>
				<td class="calculateResults">
					<!-- <input type="text" id="currentAgeWeeks" class="smallInput" data-bind="value: currentAgeWeeks, valueUpdate: 'afterkeydown', calculateAge: 'currentAgeWeeks'"> -->
					<b><span data-bind="text: currentAgeWeeks"></span></b>
				</td>
				<td>=</td>
				<td class="calculateResults">
					<!-- <input type="text" id="currentAgeMonths" class="smallInput" data-bind="value: currentAgeMonths, valueUpdate: 'afterkeydown', calculateAge: 'currentAgeMonths'"> -->
					<b><span data-bind="text: currentAgeMonths"></span></b>
				</td>
				<td>=</td>
				<td class="calculateResults">
					<!-- <input type="text" id="currentAgeYears" class="smallInput" data-bind="value: currentAgeYears, valueUpdate: 'afterkeydown', calculateAge: 'currentAgeYears'"> -->
					<b><span data-bind="text: currentAgeYears"></span></b>
				</td>
			</tr>
    	</table>
    </body>
</html>
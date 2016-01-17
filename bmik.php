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
	    		<td colspan=5 class="tableHeader">Age</td>
			</tr>
			<tr>
				<td>Weeks</td>
				<td>=</td>
				<td>Months</td>
				<td>=</td>
				<td>Years</td>
			</tr>
			<tr>
				<td>
					<input type="text" id="currentAgeWeeks" class="smallInput" data-bind="value: currentAgeWeeks, event: { focusout: calculateAgeEvent.bind($data, 'currentAgeWeeks') }">
				</td>
				<td>=</td>
				<td>
					<input type="text" id="currentAgeMonths" class="smallInput" data-bind="value: currentAgeMonths, event: { focusout: calculateAgeEvent.bind($data, 'currentAgeMonths') }">
				</td>
				<td>=</td>
				<td>
					<input type="text" id="currentAgeYears" class="smallInput" data-bind="value: currentAgeYears, event: { focusout: calculateAgeEvent.bind($data, 'currentAgeYears') }">
				</td>
			</tr>
    	</table>
    </body>
</html>
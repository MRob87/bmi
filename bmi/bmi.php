<!DOCTYPE html>
<html>
    <head>
        <title>BMI</title>
        <!-- data-main attribute tells require.js to load
             scripts/main.js after require.js loads. -->
        <script data-main="bmi.js" src="js/require.js"></script>
        <script type="text/javascript">
	        
        </script>
    </head>
    <body>   
    	<!-- conversions -->
    	<table style="width:750px">
	    	<tr>
	    		<td colspan=2 style="background-color: #CCC">Height</td>
	    	</tr>
	    	<tr>
	    		<td style="width:35%"><b>Ft-In (ex. 5-11, 5'11")</b></td>
	    		<td style="width:65%"><input style="width:50px" data-bind="value: heightFtIn, valueUpdate: 'afterkeydown'" maxlength=5></td>
	    	</tr>
	    	<tr>
	    		<td><b>Inches:</b></td>
	    		<td>
	    			<span data-bind="text: heightTotalIn()"></span>
	    		<!-- <input style="width:50px" data-bind="value: heightTotalIn, valueUpdate: 'afterkeydown'" maxlength=5> -->
	    		</td>
	    	</tr>
	    	<tr>
	    		<td><b>Centimeters: </b></td>
	    		<td><span data-bind="text: heightCm()" size=5></span></td>
	    	</tr>
	    	<tr>
	    		<td><b>Age:</b></td>
	    		<td><input style="width:50px" data-bind="value: age, valueUpdate: 'afterkeydown'" size=2></td>
	    	</tr>
	    	<tr>
	    		<td colspan=2>&nbsp;</td>
	    	</tr>
	    	<tr>
	    		<td colspan=2 style="background-color: #CCC">Weight</td>
	    	</tr><tr>
		    	<td><b>Lb: </b></td>
		    	<td><input style="width:50px" data-bind="value: weightLb, valueUpdate: 'afterkeydown'" maxlength=5></td>
	    	</tr><tr>
		    	<td><b>Kg: </b></td>
		    	<td><span data-bind="text: weightKg()"></td>
	    	</tr>
	    	<tr>
	    		<td colspan=2>&nbsp;</td>
	    	</tr>
    		<!-- BMI -->
	    	<tr><td colspan=2 style="background-color: #CCC">BMI</td></tr>
	    	<tr>
		    	<td colspan=2>
			        <!-- ko if: bmi() > 0 -->
				        <span data-bind="text: bmi()"></span><br>
				        <span data-bind="if: bmi() < 18.5" style="color: blue"><b>Underweight</b></span>
				        <span data-bind="if: bmi() >= 18.5 && bmi() < 25" style="color: green"><b>Normal</b></span>
				        <span data-bind="if: bmi() >= 25 && bmi() < 30" style="color: orange"><b>Overweight</b></span>
				        <span data-bind="if: bmi() > 30 && bmi() <= 35" style="color: red"><b>Obese I</b></span>
				        <span data-bind="if: bmi() > 35 && bmi() <= 40" style="color: red"><b>Obese II</b></span>
				        <span data-bind="if: bmi() > 40" style="color: red"><b>Morbid Obese</b></span>
			        <!-- /ko -->
			    </td>
		    </tr>
	    	<tr>
	    		<td colspan=2>&nbsp;</td>
	    	</tr>
    		<!-- REE -->
	    	<tr><td colspan=2 style="background-color: #CCC">REE</td></tr>
	    	<tr>
	    		<td><b>Male</b></td>
	    		<td><span data-bind="text: maleRee()"></span> kcal</td>
	    	</tr>
	    	<tr>
	    		<td><b>Female</b></td>
	    		<td><span data-bind="text: femaleRee()"></span> kcal</td>
	    	</tr>
	    	<tr>
	    		<td colspan=2>&nbsp;</td>
	    	</tr>
	    	<!-- Caloric needs -->
	    	<tr><td colspan=2 style="background-color: #CCC">Total Estimate Calorie Need</td></tr>
	    	<tr><td colspan=2>
		    	<table style="width:100%;">
			    	<tr>
			    		<td style="width:35%;"></td>
			    		<td style="width:10%;"><b>Male</b></td>
			    		<td style="width:55%;"><b>Female</b></td>
			    	<tr>
			    		<td><b>Activity Factor 1.2</b></td>
			    		<td><span data-bind="text: maleActivityFactor2()"></td>
			    		<td><span data-bind="text: femaleActivityFactor2()"></td>
			    	</tr>
			    	<tr>
			    		<td><b>Activity Factor 1.3</b></td>
			    		<td><span data-bind="text: maleActivityFactor3()"></td>
			    		<td><span data-bind="text: femaleActivityFactor3()"></td>
			    	</tr>
			    	<tr>
			    		<td><b>Activity Factor 1.4</b></td>
			    		<td><span data-bind="text: maleActivityFactor4()"></td>
			    		<td><span data-bind="text: femaleActivityFactor4()"></td>
			    	</tr>
			    </table>
		    </td></tr>
	    	<tr>
	    		<td colspan=2>&nbsp;</td>
	    	</tr>
	    	<!-- Protein needs -->
	    	<tr><td colspan=4 style="background-color: #CCC">Total Protein Need</td></tr>
	    	<tr>
	    		<td><b>0.8</b></td>
	    		<td><span data-bind="text: proteinNeed1()"></span> g</td>
	    	</tr>
	    	<tr>
	    		<td><b>1.0</b></td>
	    		<td><span data-bind="text: weightKg()"></span> g</td>
	    	</tr>
	    	<tr>
	    		<td><b>1.2</b></td>
	    		<td><span data-bind="text: proteinNeed3()"></span> g</td>
	    	</tr>
	    	<tr>
	    		<td><b>1.5</b></td>
	    		<td><span data-bind="text: proteinNeed4()"></span> g</td>
	    	</tr>
	    	<tr>
	    		<td colspan=2>&nbsp;</td>
	    	</tr>
	    	<!-- Fluid needs -->
	    	<tr><td colspan=4 style="background-color: #CCC">Total Fluid Need</td></tr>
	    	<tr>
	    		<td><b>CHF or renal disease: 25 mL/kg</b></td>
	    		<td><span data-bind="text: (weightKg()*25).toFixed(0)"></span> mL</td>
	    	</tr>
	    	<tr>
	    		<td><b>Average Adult: 30 mL/kg</b></td>
	    		<td><span data-bind="text: (weightKg()*30).toFixed(0)"></span> mL</td>
	    	</tr>
	    	<tr>
	    		<td><b>Infection/draining wound: 35 mL/kg</b></td>
	    		<td><span data-bind="text: (weightKg()*35).toFixed(0)"></span> mL</td>
	    	</tr>
    	</table>
    </body>
</html>
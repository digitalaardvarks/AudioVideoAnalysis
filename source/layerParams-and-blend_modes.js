// assign parameters to jit.gl.layer objects when 
// toggeling new diplay view option or color

autowatch = 1;
inlets = 1;
outlets = 2;

var displayToggle_stored = 1;
var params_interval_range = 3; // 3 because we output 3 params to each object if dt changes (enable, pos and scale).
var sg_layer_params = [["enable", 1], ["position", 0, 0.5, 0], ["scale", 1, 0.5, 1], // if displaytoggle == 0
					   ["enable", 1], ["position", 0, 0, 0], ["scale", 1, 1, 1], // if displaytoggle == 1
					   ["enable", 0], ["position", 0, 0, 0], ["scale", 1, 1, 1], // if displaytoggle == 2
					   ["enable", 1], ["position", 0, 0, 0], ["scale", 1, 1, 1]]; // if displaytoggle == 3
					
var mg_layer_params = [["enable", 1], ["position", 0, -0.5, 0], ["scale", 1, 0.5, 1], // if displaytoggle == 0
                       ["enable", 0], ["position", 0, 0, 0], ["scale", 1, 1, 1], // if displaytoggle == 1
                       ["enable", 1], ["position", 0, 0, 0], ["scale", 1, 1, 1], // if displaytoggle == 2
					   ["enable", 1], ["position", 0, 0, 0], ["scale", 1, 1, 1]]; // if displaytoggle == 3

var color_interval_range = 4; // 4 because there are 4 relevant color variations (rgb, sg inv, mg inv, both inv)
// indexes for blend_mode variables are 
// ((displaytoggle*color_interval_range) + 0 if rgb, 1 if sg inv, 2 if mg inv, 3 if both inv).
var sg_blend_modes = [["blend_mode", 4, 1], ["blend_mode", 4, 4], ["blend_mode", 4, 1], ["blend_mode", 4, 4], // if displaytoggle == 0
					  ["blend_mode", 4, 1], ["blend_mode", 4, 4], ["blend_mode", 4, 1], ["blend_mode", 4, 4], // if displaytoggle == 1
					  ["blend_mode", 4, 1], ["blend_mode", 4, 4], ["blend_mode", 4, 1], ["blend_mode", 4, 4], // if displaytoggle == 2
					  ["blend_mode", 4, 1], ["blend_mode", 6, 1], ["blend_mode", 2, 7], ["blend_mode", 2, 4]]; // if displaytoggle == 3

var mg_blend_modes = [["blend_mode", 4, 6], ["blend_mode", 4, 6], ["blend_mode", 4, 4], ["blend_mode", 4, 4], // if displaytoggle == 0
					  ["blend_mode", 4, 6], ["blend_mode", 4, 6], ["blend_mode", 4, 4], ["blend_mode", 4, 4], // if displaytoggle == 1
					  ["blend_mode", 4, 6], ["blend_mode", 4, 6], ["blend_mode", 4, 4], ["blend_mode", 4, 4], // if displaytoggle == 2
					  ["blend_mode", 4, 6], ["blend_mode", 4, 6], ["blend_mode", 4, 4], ["blend_mode", 4, 4]]; // if displaytoggle == 3;

function anything(sgColor, mgColor, displayToggle) {
	if (displayToggle != displayToggle_stored) {
		for (i=0; i<params_interval_range; i++) {
			outlet(0, sg_layer_params[i+(displayToggle*params_interval_range)]);
			outlet(1, mg_layer_params[i+(displayToggle*params_interval_range)]);
		}
		displayToggle_stored = displayToggle;
	}
	outlet(0, sg_blend_modes[(displayToggle*color_interval_range) + colorInterval(sgColor, mgColor)]);
	outlet(1, mg_blend_modes[(displayToggle*color_interval_range) + colorInterval(sgColor, mgColor)]);
}

function colorInterval(sgC, mgC) {	
	// 0 = RGB 
	// 1 = Sg inverted
	// 2 = Mg inverted
	// 3 = Both inverted
	var output = 0;
	if (sgC%2 == 0) {
		output = 1;
	}
	if (mgC%2 == 0) {
		output += 2;
	}
	return output;
}
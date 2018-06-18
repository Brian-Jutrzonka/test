
//Misc. jQuery/JS
$(document).ready(function() {
//Mobile Menu
	$("#mobile-menu").mmenu();
	$("#mobile-menu").addClass("mobile-menu-load");
	$("#notice-count").addClass("notice-count-load");
});

// Modx interprets all double-brackets as CMS shortcodes. 
// If you're app has JSON objects with nested arrays like this: "[[foo,bar],[foo,bar],[foo,bar]...]"
// those will get routed into the Modx API instead of being treated as the data they are.
// This is bad. Our helper function will fix it by adding whitespace between double-brackets.
window.prepareModxInputString = function(string){
	string = typeof string != 'undefined' ? string : '';
	modxSafeString = string.replace(/(\[)|(\])/gmi,"$1$2 ");
	return (modxSafeString);
};
String.prototype.prepareModxInputString = function () {
	return window.prepareModxInputString(this);
};

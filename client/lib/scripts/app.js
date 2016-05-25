angular.module('speakeasy', [
	'angular-meteor', 
	'ui.router',
	'angularUtils.directives.dirPagination',
	'ngMaterial',
	'ngFileUpload',
	'ngImgCrop',
]);

function onReady() {
	angular.bootstrap(document, ['speakeasy'], {
		strictDi: true
	});
}

if (Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
} else {
	angular.element(document).ready(onReady);
}
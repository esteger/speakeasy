angular.module('speakeasy').directive('speakeasy', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/speakeasy.html',
		controllerAs: 'speakeasy',
		controller: function($scope, $reactive, $state, $mdSidenav, $mdMedia) {
			let reactiveContext = $reactive(this).attach($scope);

			this.version = '1.6';

			this.media = $mdMedia;

			this.controlPanels = [
				{ name: 'userlist', icon: null },
				{ name: 'settings', icon: 'gears' }
			];
			
			this.controlPanelIsOpen = false;
			this.activeControlPanel = null;
			this.hideBtnClose = false;

			reactiveContext.subscribe('votes');
			reactiveContext.subscribe('users');
			reactiveContext.subscribe('images');

			reactiveContext.helpers({
				isLoggedIn: () => {
					return Meteor.userId() !== null;
				},
				currentUser: () => {
					return Meteor.user();
				},
				users: () => {
					return Meteor.users.find({});
				},
				usersOnline: () => {
					return Counts.get('usersOnline');
				},
				images: () => {
					return Images.find({});
				},
				votes: () => {
					return Votes.find({});
				}
			});

			this.logout = () => {
				Accounts.logout(() => {
					$state.go('login');
				});
			};

			this.toggleControlPanel = (controlPanel) => {
				this.hideBtnClose = false;
				if ($mdSidenav('controlPanel').isOpen()) {
					if (this.activeControlPanel === controlPanel) {
						this.activeControlPanel = null;
						this.hideBtnClose = true;
						$mdSidenav('controlPanel').close().then(() => {
							this.controlPanelIsOpen = false;
						});
					} else {
						this.activeControlPanel = controlPanel;
					}
				} else {
					this.activeControlPanel = controlPanel;
					$mdSidenav('controlPanel').open().then(() => {
						this.controlPanelIsOpen = true;
					});
				}
			};

		}
	}
});
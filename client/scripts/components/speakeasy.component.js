angular.module('speakeasy').directive('speakeasy', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/speakeasy.html',
		controllerAs: 'speakeasy',
		controller: function($scope, $reactive, $state, $mdSidenav, $mdMedia) {
			let reactiveContext = $reactive(this).attach($scope);

			this.version = '2.0';

			this.media = $mdMedia;

			this.controlPanels = [
				{ name: 'userlist', icon: null },
				{ name: 'settings', icon: 'gears' }
			];
			
			this.controlPanelIsOpen = false;
			this.activeControlPanel = null;
			this.hideBtnClose = false;

			Tracker.autorun(function() {
				if (!!Meteor.userId()) {
					try {
						UserStatus.startMonitor({
							threshold: 30000,
							interval: 1000,
							idleOnBlur: true
						});
						console.log('Idle monitor started.')
					} catch(e) {
						console.warn(e);
					}
				} else {
					try {
						UserStatus.stopMonitor();
					} catch(e) {
						console.warn(e);
					}
				}
			});

			reactiveContext.subscribe('votes');
			reactiveContext.subscribe('users');
			reactiveContext.subscribe('images');

			reactiveContext.helpers({
				currentTime: () => {
					return TimeSync.serverTime(null, 60000);
				},
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
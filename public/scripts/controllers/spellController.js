dungeonPackApp.controller('spellController', function (AuthFactory, $http, $window) {
  console.log('loaded spellController');
  var _this = this;
  var authFactory = AuthFactory;
  _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load


  _this.logout = function () {
    authFactory.logout()
      .then(function (response) { // success
        authFactory.setLoggedIn(false);
        _this.username = '';
        $window.location.href = '/'; // forces a page reload which will update our NavController
      },

      function (response) { // error
        _this.message.text = 'Unable to logout';
        _this.message.type = 'error';
      });
  };

  _this.getAll = function(){
  $http.get('/spell/all').then(function (response) {
    console.log("Got a response from the DB", response.data);
    _this.spellList = response.data;
    return response.data;
  }).catch(function(err) {
    console.log('Error getting info from DB', err);
  });
};

  _this.getAll();




});

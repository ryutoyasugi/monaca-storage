var viewModel = new Vue({
  el: '#local-storage',
  data: {
    name: '',
    users: []
  },
  methods: {
    add: function() {
      var name = this.name.trim();
      if (name) {
        var user = { name: name };
        localStorage.setItem(this.users.length, JSON.stringify(user));
        this.users.push(user);
        this.name = '';
      }
    },
    del: function(index) {
      this.users.splice(index, 1);
      localStorage.clear();
      for (var i = 0; i < this.users.length; i++) {
        localStorage.setItem(i, JSON.stringify(this.users[i]));
      }
    }
  }
});

ons.ready(function() {
  // localStorageのデータをviewModelに入れる
  for (key in localStorage) {
    viewModel.users.push(JSON.parse(localStorage.getItem(key)));
  }  
});

function localStorageClear() {
  localStorage.clear();
  viewModel.users = [];
  ons.notification.alert({
    message: 'cleared!'
  });
}

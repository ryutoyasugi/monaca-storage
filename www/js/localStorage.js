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
        var id = 0;
        for (var i = 0; i < this.users.length; i++) {
          id = this.users[i].id + 1;
        }
        var user = { id: id, name: name };
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.name = '';
      }
    },
    del: function(id) {
      for (var i = 0; i < this.users.length; i++) {
        if (id === this.users[i].id) {
          this.users.splice(i, 1);
          break;
        }
      }
      localStorage.setItem('users', JSON.stringify(this.users));
    },
    clear: function() {
      localStorage.clear();
      this.name = '';
      this.users = [];
      ons.notification.alert({
        message: 'cleared!'
      });
    }
  }
});

ons.ready(function() {
  // localStorageのデータをviewModelに入れる
  var users = localStorage.getItem('users');
  if (users) {
    viewModel.users = JSON.parse(users);
  }
});

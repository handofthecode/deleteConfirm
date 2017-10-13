
todo_items = [{id: 1, title: 'Homework'},
            {id: 2, title: 'Shopping'},
            {id: 3, title: 'Calling Mom'},
            {id: 4, title: 'Coffee with John'}];

var todo = {
  registerHandlers: function() {
    $('.cross').on('click', this.handleDelete)
    $('#confirm').on('click', 'button', this.handleConfirm)
  },
  handleDelete: function(e) {
    this.$currentTodo = $(e.target).closest('li');
    var name = this.$currentTodo.first().text();
    $('#name').html(name);
    $('#confirm').show();
  }.bind(this),
  handleConfirm: function(e) {
    if (e.target.id === 'yes') this.$currentTodo.remove();
    $('#confirm').hide();
  }.bind(this),
  setupTodos: function() {
    this.todos.forEach(function(item) {
      var source = $('#entry-template').html();
      var template = Handlebars.compile(source);
      $('#todos').prepend(template(item));
    });
  },
  init: function() {
    this.todos = todo_items;
    this.setupTodos();
    this.registerHandlers();
  }
}
todo.init();

todo_items = [{id: 1, title: 'Homework'},
            {id: 2, title: 'Shopping'},
            {id: 3, title: 'Calling Mom'},
            {id: 4, title: 'Coffee with John'}];

var todo = {
  registerHandlers: function() {
    $('.cross').on('click', this.handleDelete.bind(this));
    this.$confirm.on('click', 'button', this.handleConfirm.bind(this));
    this.$todos.contextmenu(this.handleShowContextMenu.bind(this));
    $(document).on('click', this.handleClick.bind(this));
    $(this.$contextMenu).on('click', 'li', this.handleContextMenu.bind(this));
  },
  handleContextMenu: function(e) {
    if($(e.target).is(this.$menuDelete)) this.deleteTodo.call(this);
  },
  handleClick: function(e) {
    this.$contextMenu.fadeOut();
  },
  handleShowContextMenu: function(e) {
    e.preventDefault();
    this.$currentTodo = $(e.target);
    this.$contextMenu.css({top: e.clientY - 18, left: e.clientX - 96});
    this.$contextMenu.slideDown();
  },
  handleDelete: function(e) {
    this.$currentTodo = $(e.target).closest('li');
    this.deleteTodo.call(this);
  },
  deleteTodo: function() {
    var name = this.$currentTodo.first().text();
    $('#name').html(name);
    this.$confirm.slideDown();
  },
  handleConfirm: function(e) {
    if (e.target.id === 'yes') this.$currentTodo.remove();
    this.$confirm.hide();
  },
  setupTodos: function() {
    this.todos.forEach(function(item) {
      var source = $('#entry-template').html();
      var template = Handlebars.compile(source);
      this.$todos.prepend(template(item));
    }.bind(this));
  },
  init: function() {
    this.$contextMenu = $('#context-menu');
    this.$menuDelete = $('#menu-delete');
    this.$confirm = $('#confirm');
    this.$todos = $('#todos');

    this.todos = todo_items;
    this.setupTodos();
    this.registerHandlers();
  }
}
todo.init();

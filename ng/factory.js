var factories = angular.module('factories', ['ngStorage']);

factories.constant('_',_);

//use of localStorage
factories.factory('API', ['$localStorage', '_', function($localStorage, _) {
    //generate ID for very todoItem

    var generateId = function () {
        return (new Date()).getTime();

    };

    //get current list from local storage
    var getList = function (name) {
        if (!$localStorage[name]) {
            return[];
        }
        //since we stored it as a string, we need to parse the JSON
        return JSON.parse($localStorage[name]);
    };

    //set current list to local storage
    var setList = function(name, list) {
        if (!list) {
            list = [];
        }
        //LocalStorage can only sve strings, therefore we must stringify our list
        $localStorage[name] = JSON.stringify(list);
    };

    return {
        get: function() {
            return getList('todos');
        },
        getArchive: function () {
            return getList('archivedTodos');
        },
        add: function(item) {
            var list = getList('todos');
            item.id = generateId();
            item.createdAt = (new Date()).getTime();
            item.updatedAt = item.createdAt;

            list.push(item);
            setList('todos',list);
            return list;
        },
        update: function(item) {
            if (!item.id) {
                throw new Error('item id not found!');
            }
            var list = getList('todos');
            var modItem = _.findWhere(list, {id: item.id});
            if (!modItem) {
                throw new Error('item not found');
            }
            //extend item properties to modItem
            item.updatedAt  = (new Date()).getTime();
            _.extend(modItem, item);

            setList('todos',list);
            return modItem;
        },
        archiveAll: function() {
            var list = getList('todos');
            var activeList = _.where(list, {done: false});
            setList('todos', activeList);

            var doneList = _.where(list, {done: true});
            var archiveList = getList('archivedTodos');
            archiveList = _.union(archiveList, doneList);
            setList('archivedTodos', archiveList);
        },
        undo: function(item) {
            if (!item.id) {
                throw new Error('item not found');
            }
            var list = getList('archivedTodos');
            var it = _.findWhere(list, {id: item.id});
            if (!it) {
                throw new Error('item not found');
            }
            //remove item from archive list
            list = _.without(list, it);
            setList('archivedTodos', list);

            //add item to Archive
            it.updatedAt = (new Date()).getTime();
            var activeList = getList('todos');
            activeList.push(it);
            setList('todos', activeList);
        }
    }
}]);
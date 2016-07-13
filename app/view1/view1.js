'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope',function($scope) {


    //array of tasks
    (JSON.parse(localStorage.getItem('tasks')))!=null?$scope.todolist = JSON.parse(localStorage.getItem('tasks')):$scope.todolist =[];



    //scope function to add a task
    $scope.addtodo= function (todo)
    {
      if(todo === undefined || todo.length <=0)
        return;

        var ntd=
        {
            created:new Date(),
            task:todo,
            checked:false
        }

        $scope.todolist.push(ntd);
        localStorage.setItem('tasks', JSON.stringify($scope.todolist));
        $scope.newtodo="";

    }

    //scope function to remove a task
    $scope.delete= function(todo)
    {
        angular.forEach($scope.todolist, function (v,i)
        {
            if(v==todo)
            {
                $scope.todolist.splice(i,1);
                localStorage.setItem('tasks', JSON.stringify($scope.todolist));
            }
        })
    }

    $scope.removealldone= function()
    {
        var taskremoving=[]

        angular.forEach($scope.todolist, function (v,i)
        {
            if(v.checked)
            {
                taskremoving.push(v)
            }
        })

        for(var i =0 ; i<taskremoving.length ; i ++ )
        {
            $scope.delete(taskremoving[i]);
        }
        localStorage.setItem('tasks', JSON.stringify($scope.todolist));
    }
    $scope.updatecheck= function()
    {
        localStorage.setItem('tasks', JSON.stringify($scope.todolist));
    }
}])
    // return the number of done task
    .filter('done', function() {
        return function(input ) {
        var output=0;
        angular.forEach(input, function (v,i) {
            if(v.checked)
                output++
        })
        return output;
    }
});

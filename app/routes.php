<?php
// Routes

$app->get('/', 'App\Controller\HomeController:home');
$app->post('/api/foodstore', 'App\Controller\FoodController:addFoodStore');
$app->post('/api/authuser', 'App\Controller\UserController:authUser');
$app->get('/api/authuser/{id}', 'App\Controller\UserController:searchUserById');
$app->post('/api/registeruser', 'App\Controller\UserController:registerUser');

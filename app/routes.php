<?php
// Routes

$app->get('/', 'App\Controller\HomeController:home');
$app->get('/api/musics', 'App\Controller\MusicController:fetch');
$app->get('/api/music/{slug}', 'App\Controller\MusicController:fetchOne');
$app->get('/api/music/delete/{id}', 'App\Controller\MusicController:removeMusic');
$app->post('/api/foodstore', 'App\Controller\FoodController:addFoodStore');
$app->post('/api/authuser', 'App\Controller\UserController:authUser');
$app->get('/api/authuser/{id}', 'App\Controller\UserController:searchUserById');
$app->post('/api/registeruser', 'App\Controller\UserController:registerUser');

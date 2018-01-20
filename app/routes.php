<?php
// Routes

$app->get('/', 'App\Controller\HomeController:home');
$app->get('/api/musics', 'App\Controller\MusicController:fetch');
$app->get('/api/music/{slug}', 'App\Controller\MusicController:fetchOne');

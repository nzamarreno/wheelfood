<?php
namespace App\Controller;

use Slim\Views\Twig;
use Psr\Log\LoggerInterface;

final class HomeController
{
    private $view;
    private $logger;

    public function home(){
        echo "Hello";
    }

    public function __construct(Twig $view, LoggerInterface $logger)
    {
        $this->view = $view;
        $this->logger = $logger;
    }

    public function dispatch($request, $response, $args)
    {
        $this->logger->info("Home page action dispatched");
        
        $this->view->render($response, 'home.twig');
        return $response;
    }
}

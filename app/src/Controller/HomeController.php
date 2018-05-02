<?php
namespace App\Controller;

use Slim\Views\Twig;
use Psr\Log\LoggerInterface;
use App\Repository\MusicRepository;
use App\Entity\Music;

final class HomeController
{
    private $view;
    private $logger;
    private $_musicRepository;

    public function __construct(Twig $view, LoggerInterface $logger, MusicRepository $musicRepository)
    {
        $this->view = $view;
        $this->logger = $logger;
        $this->_musicRepository = $musicRepository;
    }

    public function home()
    {
        $music = new Music();
        $music->setTitle('Je suis perdu');
        $music->setSlug('Bonjour');
        $music->setGenre('Bonjour');
        
        $this->_musicRepository->AddEntity($music);
    }

    public function dispatch($request, $response, $args)
    {
        $this->logger->info("Home page action dispatched");

        $this->view->render($response, 'home.twig');
        return $response;
    }
}

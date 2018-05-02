<?php
namespace App\Controller;

use App\Repository\MusicRepository;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

final class MusicController
{
    private $MusicRepository;

    public function __construct(MusicRepository $musicRepository)
    {
        $this->MusicRepository = $musicRepository;
    }

    public function fetch(ServerRequestInterface $request, ResponseInterface $response, $args)
    {
        $musics = $this->MusicRepository->get();
        $result = $response->withHeader('Content-type', 'application/json');
        $response = $result->withJSON($musics, 200, JSON_UNESCAPED_UNICODE);

        return $response;
    }

    public function fetchOne($request, $response, $args)
    {
        $Music = $this->MusicRepository->get($args['slug']);

        if ($Music) {
            return $response->withJSON($Music);
        }

        return $response->withStatus(404, 'No Music found with that slug.');
    }

    public function removeMusic($request, $response, $args){
        $id = $args['id'];

        $this->MusicRepository->deleteEntityById($id);
    }
}

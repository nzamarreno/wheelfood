<?php
namespace App\Controller;

use App\Repository\MusicRepository;

final class MusicController
{
    private $MusicRepository;

    public function __construct(MusicRepository $MusicRepository)
    {
        $this->MusicRepository = $MusicRepository;
    }

    public function fetch($request, $response, $args)
    {
        $musics = $this->MusicRepository->get();
        return $response->withJSON($musics);
    }

    public function fetchOne($request, $response, $args)
    {
        $Music = $this->MusicRepository->get($args['slug']);
        if ($Music) {
            return $response->withJSON($Music);
        }
        return $response->withStatus(404, 'No Music found with that slug.');
    }
}

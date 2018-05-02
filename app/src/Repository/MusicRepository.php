<?php

namespace App\Repository;

use App\AbstractRepository;
use App\Entity\Music;

/**
 * Class Resource
 * @package App
 */
class MusicRepository extends AbstractRepository
{
    /**
     * @param string|null $slug
     *
     * @return array
     */
    public function get()
    {
        return $this->entityManager->getRepository('App\Entity\Music')->findAll();
    }

    public function getBySlug(string $slug)
    {
        return $this->entityManager->getRepository('App\Entity\Music')->findOneBy(
            array('slug' => $slug)
        );
    }

    public function addEntity(Music $music)
    {
        $this->entityManager->persist($music);
        $this->entityManager->flush();
    }

    public function deleteEntityById(Int $musicId)
    {
        $music_remove = $this->entityManager->getRepository('App\Entity\Music')->findOneBy(array('id' => $musicId));
        $this->entityManager->remove($music_remove);
        $this->entityManager->flush();
    }
}

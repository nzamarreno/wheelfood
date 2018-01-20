<?php

namespace App\Repository;

use App\AbstractRepository;

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
    public function get($slug = null)
    {
        if ($slug === null) {
            $music = $this->entityManager->getRepository('App\Entity\Music')->findAll();
            var_dump($music);
        
            return $music;
        } else {
            $music = $this->entityManager->getRepository('App\Entity\Music')->findOneBy(
                array('slug' => $slug)
            );
        }

        return false;
    }
}

<?php

namespace App\Resource;

use App\AbstractResource;

/**
 * Class Resource
 * @package App
 */
class PhotoResource extends AbstractResource
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
            $music = array_map(
                function ($music) {
                    return $music->getArrayCopy();
                },
                $music
            );

            return $music;
        } else {
            $music = $this->entityManager->getRepository('App\Entity\Music')->findOneBy(
                array('slug' => $slug)
            );
        }

        return false;
    }
}

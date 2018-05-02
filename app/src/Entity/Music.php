<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="Music")
 */
class Music
{
    /**
     * @ORM\Id
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @ORM\Column(type="string", length=64)
     */
    public $title;

    /**
     * @ORM\Column(type="string", length=150)
     */
    public $genre;

    /**
     * @ORM\Column(type="string", length=100)
     */
    public $slug;

    /**
     * Get photo id
     *
     * @ORM\return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get photo title
     *
     * @ORM\return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set photo title
     *
     * @ORM\Set string
     */
    public function setTitle(string $title)
    {
        $this->title = $title;
    }

    /**
     * Get photo slug
     *
     * @ORM\return string
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Get photo slug
     *
     * @ORM\return string
     */
    public function setSlug(string $slug)
    {
        $this->slug = $slug;
    }

    /**
     * Get photo image
     *
     * @ORM\return string
     */
    public function getGenre()
    {
        return $this->genre;
    }

    public function setGenre(string $genre)
    {
        $this->genre = $genre;
    }
}

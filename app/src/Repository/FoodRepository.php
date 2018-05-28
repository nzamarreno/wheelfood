<?php
namespace App\Repository;

use App\AbstractRepository;
use App\Entity\Food;
use App\Entity\User;

class FoodRepository extends AbstractRepository 
{
    public function insertFoodStore(string $title, int $type, string $price, string $distance, User $user)
    {
        $foodStore = new Food();
        
        $foodStore
            ->setTitle($title)
            ->setType($type)
            ->setPrice($price)
            ->setDistance($distance)
            ->setUser($user);

        $this->entityManager->persist($foodStore);
        $this->entityManager->flush();

        return $foodStore->getId();
    }

    public function getFoodStoreByUser(User $user)
    {
        return $this->entityManager
            ->getRepository("App\Entity\Food")
            ->findBy(array("user" => $user));
    }
}
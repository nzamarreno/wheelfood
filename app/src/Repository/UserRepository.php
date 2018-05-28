<?php
namespace App\Repository;

use App\AbstractRepository;
use App\Entity\User;

class UserRepository extends AbstractRepository
{
    public function getUserById(Int $id)
    {
        return $this->entityManager
            ->getRepository('App\Entity\User')
            ->findBy(array("id" =>$id));
    }

    public function getUserAuth(string $pseudo, string $password): array
    {
        return $this->entityManager
            ->getRepository('App\Entity\User')
            ->findBy(array("pseudo" => $pseudo, "password" => $password));
    }

    public function registerUser(User $user)
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }

    private function randHash($len=32)
    {
        return substr(md5(openssl_random_pseudo_bytes(20)),-$len);
    }
}
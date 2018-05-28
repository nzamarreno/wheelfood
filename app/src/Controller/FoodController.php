<?php
namespace App\Controller;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Repository\FoodRepository;
use App\Repository\UserRepository;

final class FoodController {
    private $UserRepository;
    private $FoodRepository;

    public function __construct(UserRepository $userRepository, FoodRepository $foodRepository){
        $this->UserRepository = $userRepository;
        $this->FoodRepository = $foodRepository;
    }

    public function addFoodStore(Request $request, Response $response){
        $value = $request->getParsedBody();

        $userCurrent = $this->UserRepository->getUserById($value["userId"]);

        $idFoodStore = $this->FoodRepository->insertFoodStore($value["name"], $value["type"], $value["price"], $value["distance"], $userCurrent[0]);


        $response
            ->withHeader('Content-type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Allow', 'POST');

        return $response->withJSON($idFoodStore);
    }
}
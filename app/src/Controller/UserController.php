<?php
namespace App\Controller;

use App\Repository\FoodRepository;
use App\Repository\UserRepository;
use App\Entity\User;
use App\ViewModel\FoodViewModel;
use App\ViewModel\UserViewModel;
use App\ViewModel\AuthViewModel;
use Psr\Http\Message\ServerRequestInterface as Request;
use \Slim\Http\Response as Response;

final class UserController 
{
    private $UserRepository;
    private $FoodRepository;

    public function __construct(UserRepository $userRepository, FoodRepository $foodRepository){
        $this->UserRepository = $userRepository;
        $this->FoodRepository = $foodRepository;
    }

    public function authUser(Request $request, Response $response) {
        $value = $request->getParsedBody();

        $pseudo = $value["pseudo"];
        $password = $value["password"];

        $userCurrent = $this->UserRepository->getUserAuth($pseudo, $password);

        $viewModel = $this->searchUserAndFoodStoreAssociated($userCurrent);

        $response
            ->withHeader('Content-type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*');

        return $response->withJson($viewModel);
    }

    public function searchUserById(Request $request, Response $response, $args)
    {
        $id = $args['id'];

        $userCurrent = $this->UserRepository->getUserById($id);

        $viewModel = $this->searchUserAndFoodStoreAssociated($userCurrent);

        return $response->withJson($viewModel);
    }

    public function registerUser(Request $request, Response $response){
        $value = $request->getParsedBody();

        $user = new User();
        $user
            ->setEmail($value["email"])
            ->setPassword($value["password"])
            ->setGender($value["gender"])
            ->setPseudo($value["pseudo"]);

        $userCurrent = $this->UserRepository->registerUser($user);

        $response
            ->withHeader('Content-type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Allow', 'POST');

        return $response->withJSON($userCurrent->getId());
    }

    private function searchUserAndFoodStoreAssociated($user)
    {

        if(count($user) > 0){
            $userCurrent = $this->FoodRepository->getFoodStoreByUser($user[0]);
        }
        else {
            $userCurrent = "null";
        }

        $resultViewModel = array();
        foreach ($userCurrent as $value){
            $viewModel = new FoodViewModel();
            $viewModel->name = $value->getTitle();
            $viewModel->type = $value->getType();
            $viewModel->distance = $value->getDistance();
            $viewModel->isSelected = false;
            array_push($resultViewModel, $viewModel);
        }

        $userModel = new UserViewModel();
        $userModel->id = $user[0]->getId();
        $userModel->email = $user[0]->getEmail();
        $userModel->pseudo = $user[0]->getPseudo();
        $userModel->gender = $user[0]->getGender();

        $viewModel = new AuthViewModel();
        $viewModel->user = $userModel;
        $viewModel->foodStore = $resultViewModel;

        return $viewModel;
    }
}



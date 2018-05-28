<?php 
use PHPUnit\Framework\TestCase;
use App\Repository\MusicRepository;
use App\Entity\Music;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;

class MusicControllerTest extends TestCase
{
    public $_musicRepository;

    public function __construct()
    {
        parent::__construct();

        $this->_musicRepository = $this->createMock(MusicRepository::class);
    }

    public function testGetBySlug()
    {          
        $this->_musicRepository->method('getBySlug')->willReturn('foo');

        $this->assertSame('foo', $this->_musicRepository->getBySlug('hello'));
    }

    public function testAddEntityReturnValue()
    {
        $this->_musicRepository->method('addEntity')->willReturn(true);

        $music = new Music();
        $music->setTitle('Titre');

        $this->assertSame(true, $this->_musicRepository->addEntity($music));
    }

    // public function testAdd(){
    //     $repo = $this->createMock(MusicRepository::class);
    //     $repo->expect($this->once())->method("testMethodRepo");

    //     $service = new Service(repo);
    // }
}
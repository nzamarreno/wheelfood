```
   _____ ___              _____ __             __            __ __ _ __
  / ___// (_)___ ___     / ___// /_____ ______/ /____  _____/ //_/(_) /_
  \__ \/ / / __ `__ \    \__ \/ __/ __ `/ ___/ __/ _ \/ ___/ ,<  / / __/
 ___/ / / / / / / / /   ___/ / /_/ /_/ / /  / /_/  __/ /  / /| |/ / /_
/____/_/_/_/ /_/ /_/   /____/\__/\__,_/_/   \__/\___/_/  /_/ |_/_/\__/
```

**StarterKit whose board Slim Framework 3 & Doctrine**  
This package is just for create my little API

## Installation

### Install environment

With Docker it's easy, launch this command and PHP, Composer and MySql will be installed.

```bash
$ docker-compose up -d
```

### Install Composer dependencies

Install Composer and theses dependencies

```bash
$ docker-compose run composer composer
```

## Some commands Doctrine

```bash
# doctrine orm[command] [-options] [path-dest]
$ php vendor/doctrine/orm/bin/doctrine orm:generate:entities --generate-annotations="true" ./

$ php vendor/doctrine/orm/bin/doctrine orm:schema-tool:update
```

## Database

If you want change database informations, you should change settings in the `settings.php` file and change informations in `docker-compose.yml`. After that, re-build your docker.

```php
# app/settings
#...
'connection' => [
    'driver'   => 'pdo_mysql',
    'host'     => 'mysql',
    'dbname'   => 'foodapi',
    'user'     => 'root',
    'password' => 'root',
]
#...
```

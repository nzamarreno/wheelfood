# WheelFood

Little app for the fondamental question ? _What do we eat today ?_

## Installation

### Environment

With Docker it's easy, launch this command and PHP, Composer and MySql will be installed.

```bash
$ docker-compose up -d
```

### Composer dependencies

Install Composer and theses dependencies

```bash
$ docker-compose run composer composer install
```

## Database

### Doctrine

```bash
# doctrine orm[command] [-options] [path-dest]
$ docker-compose run php php vendor/doctrine/orm/bin/doctrine orm:generate:entities --generate-annotations="true" ./

# Show the changements on your database
$ docker-compose run php php vendor/doctrine/orm/bin/doctrine orm:schema-tool:update

# Apply the changements
$ docker-compose run php php vendor/doctrine/orm/bin/doctrine orm:schema-tool:update --force
```

### Configuration _(not necessary)_

If you want change database informations, you should change settings in the `settings.php` file and change informations in `docker-compose.yml`. After that, re-build your docker.  
**WARNING:** Change these informations in the `docker-compose.yml`

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

## Endpoint

You should configure your endpoint in the `front/src/enums/endpoint.ts` file.

## Launch your application
You can view your application in local when you enter this address `localhost:1112`
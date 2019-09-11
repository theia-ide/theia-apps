# PHP

### Build latest

```bash
docker build . -t theiaide/theia-php:latest
```

### Build next

```bash
docker build --build-arg version=next . -t theiaide/theia-php:next
```

### Run locally on Linux or OS X

```bash
docker run -it --init -p 3000:3000 -v "$(pwd):/home/project" theiaide/theia-php:latest
```

### Run with xdebug

```bash
docker run -it --init -e "PHPLS_ALLOW_XDEBUG=2.6.1" -p 3000:3000 -v "$(pwd):/home/project" theiaide/theia-php:latest
```


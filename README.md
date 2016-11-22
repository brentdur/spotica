# Spotica
(delete it)

## Setting up your dev environment

__Prerequisite__: Get the environment variables from Chelsea or whoever has them. This `.env` file will live in the root of our repo.

1. Install node if you don't already have it.

2. [Install docker.](https://docs.docker.com/docker-for-mac/) Make sure you do step 1 and 2 of that page.

3. Set up your default docker machine ([Source](https://docs.docker.com/machine/get-started/))
  - If you do `docker-machine ls`, you'll see you have no machines
  - Type the folllowing. This may take a few mins. Especially if you're on NYU wifi. ha ha ha.
    ```shell
    docker-machine create --driver virtualbox default
    ```
  - Type `docker-machine ls` and you should see a default machine
  - Connect your shell to the new docker machine
    ```shell
    eval "$(docker-machine env default)"
    ```

4. Install all of the things, and build and start our docker image!
  ```shell
  ./scripts/setup.sh
  ```

5. Check which port our app is running on, and go to that in our browser to see our work!
  ```shell
  docker-machine ip
  ```

## In general

Whenever you want to run our docker image, just use:

```shell
./scripts/start.sh
```

#### Handy commands

Remove all docker containers at once (visible via `docker ps`).

```shell
docker rm --force `docker ps -qa`
```

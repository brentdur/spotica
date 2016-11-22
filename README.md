# Spotica
(delete it)

## Setting up your dev environment

__Prerequisite__: Get the environment variables from Chelsea or whoever has them. This `.env` file will live in the root of our repo.

1. [Install docker.](https://docs.docker.com/docker-for-mac/) Make sure you do step 1 and 2 of that page.

2. Set up your default docker machine ([Source](https://docs.docker.com/machine/get-started/))
  - If you do `docker-machine ls`, you'll see you have no machines
  - Type the folllowing. This may take a few mins. Especially if you're on NYU wifi. ha ha ha.
    ```shell
    docker-macihne create --driver virtualbox default
    ```
  - Type `docker-machine ls` and you should see a default machine
  - Connect your shell to the new docker machine
    ```shell
    eval "$(docker-machine env default)"
    ```

3. Build our docker image! Yay! Do this whenever you make modifications.
  ```shell
  ./build.sh
  ```

4. Run it. W00t!
  ```shell
  ./start.sh
  ```

Alternatively, let's combine the `./build.sh` and `./start.sh` scripts in `./build-start.sh`.

#### Handy commands

Remove all docker containers at once (visible via `docker ps`).

```shell
docker rm --force `docker ps -qa`
```

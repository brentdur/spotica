# https://github.com/brikis98/docker-osx-dev
curl -o /usr/local/bin/docker-osx-dev https://raw.githubusercontent.com/brikis98/docker-osx-dev/master/src/docker-osx-dev
chmod +x /usr/local/bin/docker-osx-dev
docker-osx-dev install --only-dependencies

# Node
npm install

echo -e "\n\033[1;32mInstalling your node modules! Yes!\033[0;37m";

echo -e "\033[1;32m\n\nLet's build that docker image! Yay!\[\033[0;37m";
./start.sh

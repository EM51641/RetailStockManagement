FROM mcr.microsoft.com/devcontainers/typescript-node

RUN apt-get update

RUN apt-get install curl universal-ctags -y

RUN curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim.appimage

RUN chmod u+x nvim.appimage

RUN ./nvim.appimage --appimage-extract

RUN ./squashfs-root/AppRun --version

RUN ln -s /squashfs-root/AppRun /usr/bin/nvim

COPY ~/.config/nvim /root/.config

COPY ~/.ssh /root

COPY package.json .

RUN npm install

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -t https://github.com/denysdovhan/spaceship-prompt \
    -a 'SPACESHIP_PROMPT_ADD_NEWLINE="false"' \
    -a 'SPACESHIP_PROMPT_SEPARATE_LINE="false"' \
    -p git \
    -p ssh-agent \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions

RUN git config --global alias.ignore '!gi() { IFS=","; curl -L -s "https://www.toptal.com/developers/gitignore/api/$*" | tee .gitignore;}; gi'

SHELL ["/bin/zsh", "-c"]

CMD [ "npm", "start"]

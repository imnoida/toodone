ARG NODE_VER
FROM node:${NODE_VER}

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.3.1 --activate

CMD ["/bin/bash", "-c", "yarn install && yarn dev --host"]

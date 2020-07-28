FROM node:14.2.0-alpine

ENV NODE_ENV production

RUN mkdir -p /var/www/task-tracker && chown -R node:node /var/www/task-tracker
WORKDIR /var/www/task-tracker

USER node


COPY --chown=node:node . /var/www/task-tracker

RUN npm install \
    && npm run build


CMD ["npm", "run", "start:prod"]
# ---
#
#FROM node:14.2.0-alpine
#
#ENV NODE_ENV production
#
#RUN mkdir -p /var/www/task-tracker && chown -R node:node /var/www/task-tracker
#WORKDIR /var/www/task-tracker
#
#USER node
#
#COPY --from=builder /var/www/task-tracker/package*.json /var/www/task-tracker/
#COPY --from=builder /var/www/task-tracker/rbac*.* /var/www/task-tracker/
#COPY --from=builder /var/www/task-tracker/dist/ /var/www/task-tracker/dist/
#
#RUN npm install
#
#CMD ["npm", "run", "start:prod"]

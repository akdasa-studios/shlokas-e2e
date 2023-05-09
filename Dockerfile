FROM mcr.microsoft.com/playwright:v1.33.0-focal
WORKDIR /e2e
COPY . .
RUN npm i
CMD ["npx", "playwright", "test"]
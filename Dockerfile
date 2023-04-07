FROM mcr.microsoft.com/playwright:v1.32.2-focal
WORKDIR /e2e
COPY . .
CMD ["npx", "playwright", "test"]
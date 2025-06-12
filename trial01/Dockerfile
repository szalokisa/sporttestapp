# 1. Fázis: Build a frontendből
FROM node:14.17-alpine as builder
# Alap build csomagok telepítése

RUN apk add --no-cache python3 make g++ 
# Munkakönyvtár
WORKDIR /app

# Másold be a package fájlokat külön, cache miatt
COPY package*.json ./

# Telepítsd a node modulokat
RUN npm install

# Másold be a teljes forráskódot
COPY . .

# Add meg az API URL-t build időben
ENV REACT_APP_API_BASE_URL=http://109.122.217.141:4001

# Buildeld le az alkalmazást
RUN npm run build

# 2. Fázis: Kiszolgálás a buildelt fájlokból
FROM node:14.17-alpine

# Telepítsd a "serve" statikus kiszolgálót
RUN npm install -g serve

# Munkakönyvtár
WORKDIR /app

# Másold be a lebuildelt fájlokat az előző fázisból
COPY --from=builder /app/build .

# Port megnyitása
EXPOSE 3001

# Indítás
CMD ["serve", "-l", "3001", "-s", ".", "--single"]

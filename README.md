# Welcome to web3erc20app 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/sidor91/web3Erc20App/blob/main/README.md)
[![License: ISC](https://img.shields.io/github/license/sidor91/web3erc20app)](#)

> App to check user's ERC20 token balance and make transfers

## Install

```sh
npm install
```

## Usage

```sh
npm start
```
```sh
npm run dev (nodemon)
```

## Get User's balance

```http
  GET /balance/:token_addr/:user_addr
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token_addr` | `string` | **Required**. An address of token to check balance of |
| `user_addr` | `string` | **Required**. User's address |


## Transfer token 

```http
  POST /transfer
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token_addr`      | `string` | **Required**. An address of token to transfer |
| `recipient_addr`      | `string` | **Required**. Recipient address |
| `amount`      | `number` | **Required**. Amount of tokens to transfer |


## Run tests

```sh
npm run test
```

## Author

👤 **Serhii Sydorenko**

* Github: [@sidor91](https://github.com/sidor91)
* LinkedIn: [@sidorchik91](https://linkedin.com/in/sidorchik91)

## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
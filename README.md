# Welcome to web3erc20app 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/sidor91/web3Erc20App/blob/main/README.md)

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

## API Reference

#### Authorization

```
{
  "headers": {
    "Authorization": "Bearer {{user's private key}}"
  }
}
```

-----------------------------------------------------------------------------------


#### Get User's balance

```http
  GET /balance/:token_addr/:user_addr
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token_addr` | `string` | **Required**. An address of token to check balance of |
| `user_addr` | `string` | **Required**. User's address |

#### Request example

```http
  {
    GET /balance/0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83/0x99824818480d6178b1f5d9DA6A42810Ea97edDE4
  }
```

#### Response example

```http
  {
    "balance": 2327.354445044012
  }
```


-----------------------------------------------------------------------------------


#### Transfer token 

```http
  POST /transfer
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token_addr`      | `string` | **Required**. An address of token to transfer |
| `recipient_addr`      | `string` | **Required**. Recipient address |
| `amount`      | `number` | **Required**. Amount of tokens to transfer |

#### Request example

```http
  {
    "token_addr": "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83",
    "recipient_addr": "0xCdDDB79dCbF452920F62F5423325b34E4C932A08",
    "amount": 10
  }
```

#### Response example

```
  {
    "token": "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83",
    "blockHash": "0x890f9d1b1a1c8e7d99666cef1fa3f1f5eaada89d70b67f79e0dcf85e20c84877",
    "blockNumber": 5314737,
    "gasUsed": "0.000000000000026941",
    "transactionHash": "0x2c752824808e59bfa27c9e72f49af6c9a0cbdd1b006f36ab73f6626b1058993b",
    "from": "0xCdDDB79dCbF452920F62F5423325b34E4C932A08",
    "to": "0xCdDDB79dCbF452920F62F5423325b34E4C932A08",
    "amount": 10
  }
```

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
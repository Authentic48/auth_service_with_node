<h1 align="center"> Auth service </h1> <br>

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [API](#requirements)

## Features

 Auth service:  Description of features 
* authentication and authorization with JWT token wrapped inside cookie. 
* update and delete single user profile
* read all users 

## Requirements
This application can run locally using: 

### NodeJs  Express  Typescript MongoDB Jest

## Api 

## signup 
### Request 
`POST '/api/users/signup'`
### Response

``` 
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
}
```

## signin 
### Request 
`POST '/api/users/signin'`
### Response

``` 
{
 'id': 'id',
 'name': 'name',
 'email': 'email',

}
```

## display profiles 
### Request 
`GET '/api/users`
### Response

``` 
[
{
  'id': 'id',
 'name': 'name',
 'email': 'email',

}
]

```

## delete user by id  
### Request 
`DELETE '/api/users/:id`
### Response

``` 
{}
```

## Update user by id  
### Request 
`PUT '/api/profile/:id`
### Response

``` 
{
 'id': 'id',
 'name': 'name',
 'email': 'email',

}
```

import React from 'react';

import {validateAll} from 'indicative';
import axios from 'axios';
import config from '../config';

export default class AuthService {
  async registerUser(data) {
    const rules = {
      name    : 'required|min:6|max:30',
      email   : 'required|email',
      password: 'required|min:6|max:30|confirmed',
    };

    const messages = {
      required            : 'This {{field}} is required',
      'name.min'          : 'The minimum symbols is 6',
      'email.email'       : 'The email is invalid',
      'password.confirmed': 'The password confirmation does not match'
    };

    try {
      await validateAll(data, rules, messages)
      try {
        const response = axios.post(`${config.apiUrl}/auth/register`, {
          name    : data.name,
          email   : data.email,
          password: data.password,
        });
        console.log(response);
        return response.data.data;
      } catch (errors) {
        // console.log(errors);
        const formattedErrors = {};
        formattedErrors['email'] = errors.response.data.email[0];
        return formattedErrors;
      }
    } catch (errors) {
      // console.log(errors);
      const formattedErrors = {};
      errors.forEach(error => formattedErrors[error.field] = error.message);
      return formattedErrors;
    }
  }
}
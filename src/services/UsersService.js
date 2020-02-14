import { httpUtils } from '../utils/HttpUtils';

class UsersService {
  signin(params, cbSuccess, cbError) {
    let url = httpUtils.signin();
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }

  getClient(params, cbSuccess, cbError) {
    let url = httpUtils.getClient();
    url = url + 
    "?UserId=" + params.UserId +
    "&ClientId=" + params.ClientId +
    "&RoleId=" + params.RoleId +
    "&Mode=" + params.Mode ;
    
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(resJson => {
      cbSuccess(resJson)
    })
    .catch((error) => {
      cbError(error);
    })
  }
}

export const usersService = new UsersService();
import { httpUtils } from '../utils/HttpUtils';

class MenuService {
  getMenuItem(params, cbSuccess, cbError) {
    let url = httpUtils.getMenuItem();
    url = url + 
    "?MenuId=" + params.MenuId +
    "&UserId=" + params.UserId +
    "&ClientId=" + params.ClientId +
    "&RoleId=" + params.RoleId +
    "&Mode=" + params.Mode;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }
  getProvider(params, cbSuccess, cbError) {
    let url = httpUtils.getProvider();
    url = url + 
    "?MenuId=" + params.MenuId +
    "&UserId=" + params.UserId +
    "&ClientId=" + params.ClientId +
    "&RoleId=" + params.RoleId +
    "&Mode=" + params.Mode;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(resJson => {
        cbSuccess(resJson);
      })
      .catch((error) => {
        cbError(error);
      });
  }
  submitData(params, cbSuccess, cbError) {
    let url = httpUtils.submitData();
    fetch (url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params) 
    })
    .then(response => response.json())
    .then(resJson => {
      cbSuccess(resJson);
    })
    .catch((error) => {
      cbError(error);
    })
  }
}

export const menuService = new MenuService();
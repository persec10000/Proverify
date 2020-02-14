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
}

export const menuService = new MenuService();
export const BASE_URL = "http://223.31.219.244:8031/api/";

class HttpUtils {
  signin() {
    return BASE_URL + "login/GetUserName";
  }
  getClient(){
    return BASE_URL + "Application/FillClient";
  }
  getMenuItem(){
    return BASE_URL + "Application/GetMenu";
  }
  getProvider() {
    return BASE_URL + "Application/GetProvider"
  }
  submitData(){
    return BASE_URL + "Application/KycRequest"
  }

  // Headers ======================
  getHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }

  getXMLHeaders() {
    return {
      Accept: 'application/xml',
      'Content-Type': 'application/json',
    }
  }
}

export const httpUtils = new HttpUtils();
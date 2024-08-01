import {logDev} from '../logs/logDev';
import {EP} from './endpoints';
import {request} from './request';

export const getHeaders = accessToken => {
  let headers = {
    'Content-type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
    // 'app-client': appClient,
    // 'app-version': vCode ? vCode : DeviceInfo.getBuildNumber(),
    // 'unique-id': uniqueId,
    // device_id: deviceId,
    // uuid: userData?.uuId ? userData?.uuId : 'not_generated',
    // advId: userData?.advId ? userData?.advId : getDefaultAdvId(),
  };
  if (accessToken) {
    headers['access-token'] = accessToken;
  }
  return headers;
};

export const fetchApi = async () => {
  let url = EP;
  const headers = getHeaders();
  const result = await request(url, 'GET', null, headers, 3, true);
  return result;
};

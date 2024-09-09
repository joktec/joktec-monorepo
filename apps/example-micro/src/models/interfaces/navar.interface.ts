export interface NaverBaseResponse<T = any> {
  resultcode: string;
  message: string;
  response: T;
}

export interface NavarProfileData {
  id: string;
  nickname: string;
  name: string;
  email: string;
  gender: string;
  age: string;
  birthday: string;
  profile_image: string;
  birthyear: string;
  mobile: string;
}

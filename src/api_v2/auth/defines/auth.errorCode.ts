// 1000 find
// 2000 create
// 3000 update
// 4000 delete

// 5000 login

export enum Auth_Service_Code {
  S_LOGIN_ID = 'S_5000_Auth',
  S_LOGIN_PW = 'S_5001_Auth',
}

export enum Auth_Service_Msg {
  S_LOGIN_ID = '잘못된 유저 id 입니다. id를 확인해주세요.',
  S_LOGIN_PW = '잘못된 비밀번호 입니다. 비밀번호를 확인해주세요.',
}

// 1000 find
// 2000 create
// 3000 update
// 4000 delete

export enum Company_Repository_Code {
  DB_FIND_DEFAULT = 'D_1000_Company',
  DB_INSERT_DEFAULT = 'D_2000_Company',
}

export enum Company_Repository_Msg {
  DB_FIND_DEFAULT = '회사를 찾는 중 문제가 발생하였습니다.',
  DB_INSERT_DEFAULT = '회사를 생성하는 중 문제가 발생하였습니다.',
}

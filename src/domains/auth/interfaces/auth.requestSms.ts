export interface RequestSmsBody {
  type: 'SMS' | 'LMS' | 'MMS';
  contentType: 'COMM';
  countryCode: '82';
  from: string; //'01011111111'
  content: string; // 문자내용
  messages: {
    to: string;
    content?: string;
  }[];
}

export interface RequestSmsConfig {
  hash: string;
  timestamp: string;
  url: string;
  accessKey: string;
}

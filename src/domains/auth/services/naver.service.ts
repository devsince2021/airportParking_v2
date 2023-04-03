/* eslint-disable @typescript-eslint/no-var-requires */
const CryptoJS = require('crypto-js');

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import {
  RequestSmsBody,
  RequestSmsConfig,
} from '../interfaces/auth.requestSms';
import { PhoneVerificationRecord } from '../dtos/auth.phoneVerificationRecordDto';

@Injectable()
export class NaverService {
  smsSuccessCode = '202';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async requestSMS(record: PhoneVerificationRecord) {
    const config = this.createSignature();
    const body = this.createSmsBody(record);

    const isSuccess = await this.axiosPostSms(config, body);
    return isSuccess;
  }

  async axiosPostSms(config: RequestSmsConfig, body: RequestSmsBody) {
    try {
      const res = await this.httpService.axiosRef.post(config.url, body, {
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          'x-ncp-iam-access-key': config.accessKey,
          'x-ncp-apigw-timestamp': config.timestamp,
          'x-ncp-apigw-signature-v2': config.hash,
        },
      });

      return res.data.statusCode === this.smsSuccessCode;
    } catch (err) {
      return false;
    }
  }

  createSmsBody(record: PhoneVerificationRecord): RequestSmsBody {
    return {
      type: 'SMS',
      contentType: 'COMM',
      countryCode: '82',
      from: record.phone,
      content: `인증코드: ${record.code}`,
      messages: [
        {
          to: record.phone,
        },
      ],
    };
  }

  // copy from naver
  createSignature() {
    const time = Date.now();
    const baseUrl = this.configService.get('NAVER_SMS_BASE_URL');
    const serviceId = this.configService.get('NAVER_SMS_ID');
    const accessKey = this.configService.get('NAVER_ACCESS_KEY'); // access key id (from portal or Sub Account)
    const secretKey = this.configService.get('NAVER_SECRET_KEY'); // secret key (from portal or Sub Account)
    const space = ' '; // one space
    const newLine = '\n'; // new line
    const method = 'POST'; // method
    const url = `/sms/v2/services/${serviceId}/messages`; // url (include query string)
    const timestamp = `${time}`; // current timestamp (epoch)

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.finalize().toString(CryptoJS.enc.Base64);
    const fullUrl = encodeURI(`${baseUrl}${url}`);

    return { hash, timestamp, url: fullUrl, accessKey };
  }
}

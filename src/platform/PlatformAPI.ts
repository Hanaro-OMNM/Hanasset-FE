import axios, { AxiosInstance } from 'axios';
import {
  ConfirmCode,
  CurrentLocation,
  EmailSignUpRequest,
  MarkerComplexId,
} from '../types/hanaAssetRequest.common.ts';
import {
  CurrentAptMarkers,
  CurrentAreaMarkers,
  RealEstateList,
} from '../types/hanaAssetResponse.common.ts';

export class PlatformAPI {
  static instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    withCredentials: true,
  });

  private static readonly defaultConfig = {
    headers: { 'Content-Type': 'application/json' },
  };

  public static async getAreaMarkersInfo(
    currentLocationData: CurrentLocation
  ): Promise<CurrentAreaMarkers> {
    const response = await this.instance.get(`/markers/area`, {
      ...this.defaultConfig,
      params: currentLocationData,
    });
    return response.data as CurrentAreaMarkers;
  }

  public static async getAptMarkersInfo(
    currentLocationData: CurrentLocation
  ): Promise<CurrentAptMarkers> {
    const response = await this.instance.get('/markers/apt', {
      ...this.defaultConfig,
      params: currentLocationData,
    });
    return response.data as CurrentAptMarkers;
  }

  public static async getRealEstatesList(
    markerComplexId: MarkerComplexId
  ): Promise<RealEstateList> {
    const response = await this.instance.get('/real-estates', {
      params: markerComplexId,
    });
    return response.data as RealEstateList;
  }

  public static async sendMail(email: string): Promise<boolean> {
    try {
      const response = await this.instance.post(
        `/users/signup/sendemail?email=${encodeURIComponent(email)}`
      );
      return response.status === 200;
    } catch (error) {
      console.error('Error sending email:', error);
      return false; // 요청 실패 시 false 반환
    }
  }

  public static async confirmCode(code: ConfirmCode): Promise<boolean> {
    try {
      const response = await this.instance.get('/users/signup/receive_code', {
        params: code,
      });
      return response.status === 200;
    } catch (error) {
      console.error('Error sending email:', error);
      return false; // 요청 실패 시 false 반환
    }
  }

  public static async signUp(emailSignUp: EmailSignUpRequest): Promise<number> {
    try {
      const response = await this.instance.post('/users/signup', emailSignUp);
      return response.status;
    } catch (error) {
      console.error('Error sending email:', error); // 요청 실패 시 false 반환
      return 400;
    }
  }
}

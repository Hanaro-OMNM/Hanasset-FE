import axios, { AxiosInstance } from 'axios';
import {
  BirthDate,
  ConfirmCode,
  CurrentLocation,
  EmailSignUpRequest,
  LoginRequest,
  MarkerComplexId,
} from '../types/hanaAssetRequest.common.ts';
import {
  CurrentAptMarkers,
  CurrentAreaMarkers,
  RealEstateBasic,
  RealEstateDetail,
  RealEstateList,
  RealEstateType,
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

  public static async getRealEstateType(
    realEstateId: number
  ): Promise<RealEstateType> {
    const response = await this.instance.get(
      `/real-estates/${realEstateId}/type`,
      {
        ...this.defaultConfig,
      }
    );
    return response.data as RealEstateType;
    }
  public static async sendMail(email: string): Promise<boolean> {
    try {
      const response = await this.instance.post(
        `/users/signup/send-email?email=${encodeURIComponent(email)}`
      );
      return response.status === 200;
    } catch (error) {
      console.error('Error sending email:', error);
      return false; // 요청 실패 시 false 반환
    }
  }

  public static async confirmCode(code: ConfirmCode): Promise<boolean> {
    try {
      const response = await this.instance.get('/users/signup/receive-code', {
        params: code,
      });
      return response.status === 200;
    } catch (error) {
      console.error('Error sending email:', error);
      return false; // 요청 실패 시 false 반환
    }
  }

  public static async getRealEstateDetail(
    realEstateId: number
  ): Promise<RealEstateDetail> {
    const response = await this.instance.get(
      `/real-estates/${realEstateId}/detail`,
      {
        ...this.defaultConfig,
      }
    );
    return response.data as RealEstateDetail;
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

  public static async getRealEstateBasic(
    realEstateId: number
  ): Promise<RealEstateBasic> {
    const response = await this.instance.get(
      `/real-estates/${realEstateId}/basic`,
      {
        ...this.defaultConfig,
      }
    );
    return response.data as RealEstateBasic;
    }
  public static async submitBirthDate(birthDate: BirthDate): Promise<number> {
    try {
      const response = await this.instance.post(`/users/birth`, birthDate);
      return response.status;
    } catch (error) {
      console.error('Error sending email:', error);
      return 400;
    }
  }

  public static async login(
    loginData: LoginRequest
  ): Promise<string | undefined> {
    try {
      const response = await this.instance.post('/users/signin', loginData);
      const authorizationHeader = response.headers.authorization;

      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const accessToken = authorizationHeader.split(' ')[1];
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
      } else {
        console.error('Authorization header is missing or invalid');
        return undefined;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return undefined;
    }
  }

  public static async logout(): Promise<string | undefined> {
    try {
      const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기
      const response = await this.instance.post(
        '/users/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
        }
      );
      localStorage.removeItem('accessToken');
      return response.data;
    } catch (error) {
      console.error('Error logout:', error);
    }
  }
}

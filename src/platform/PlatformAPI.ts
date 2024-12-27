import axios, { AxiosInstance } from 'axios';
import { jwtDecode } from 'jwt-decode';
import qs from 'qs';
import {
  BirthDate,
  ConfirmCode,
  CurrentLocation,
  EmailSignUpRequest,
  LoginRequest,
  MarkerComplexId,
  RealEstateMarketPriceParam,
  RecentVisitedRealEstatesIds,
  RealEstateIds,
  ChatCreateRequest,
} from '../types/hanaAssetRequest.common.ts';
import {
  CurrentAptMarkers,
  CurrentAreaMarkers,
  RealEstateBasic,
  RealEstateDetail,
  RealEstateList,
  ChatRoom,
  ChatRoomDTO,
  ChatMessage,
  ApiResponseEntity,
  RealEstateMarketPrice,
  RealEstateType,
  LoanRecommend,
  LoanDetail,
  UserInfoResponse,
  BookmarkArea,
  BookmarkAreaStatus,
} from '../types/hanaAssetResponse.common.ts';

export class PlatformAPI {
  static isTokenExpired = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp! < currentTime;
    } catch (error) {
      console.error('Invalid token', error);
      return true;
    }
  };

  static instance: AxiosInstance = (() => {
    const instance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 10000,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });

    instance.interceptors.response.use(
      (response) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && this.isTokenExpired(accessToken)) {
          const authorizationHeader = response.headers.authorization;
          if (
            authorizationHeader &&
            authorizationHeader.startsWith('Bearer ')
          ) {
            const accessToken = authorizationHeader.split(' ')[1];
            localStorage.setItem('accessToken', accessToken);
          } else {
            console.error('Authorization header is missing or invalid');
          }
        }
        return response;
      },
      (error) => {
        console.error('Response error:', error);
      }
    );

    return instance;
  })();

  private static readonly defaultConfig = {
    headers: { 'Content-Type': 'application/json' },
  };

  public static async getAreaMarkersInfo(
    currentLocationData: CurrentLocation
  ): Promise<CurrentAreaMarkers> {
    const response = (await this.instance.get(`/markers/area`, {
      ...this.defaultConfig,
      params: currentLocationData,
    })) as ApiResponseEntity<CurrentAreaMarkers>;
    return response.data.result as CurrentAreaMarkers;
  }

  public static async getAptMarkersInfo(
    currentLocationData: CurrentLocation
  ): Promise<CurrentAptMarkers> {
    const response = (await this.instance.get('/markers/apt', {
      ...this.defaultConfig,
      params: currentLocationData,
    })) as ApiResponseEntity<CurrentAptMarkers>;
    return response.data.result as CurrentAptMarkers;
  }

  public static async getRealEstatesList(
    markerComplexId: MarkerComplexId
  ): Promise<RealEstateList> {
    const response = (await this.instance.get('/real-estates', {
      params: markerComplexId,
    })) as ApiResponseEntity<RealEstateList>;
    return response.data.result as RealEstateList;
  }

  public static async getRealEstateDetail(
    realEstateId: number
  ): Promise<RealEstateDetail> {
    const response = (await this.instance.get(
      `/real-estates/${realEstateId}/detail`,
      {
        ...this.defaultConfig,
      }
    )) as ApiResponseEntity<RealEstateDetail>;
    return response.data.result as RealEstateDetail;
  }

  public static async getRealEstateBasic(
    realEstateId: number
  ): Promise<RealEstateBasic> {
    const response = (await this.instance.get(
      `/real-estates/${realEstateId}/basic`,
      {
        ...this.defaultConfig,
      }
    )) as ApiResponseEntity<RealEstateBasic>;
    return response.data.result as RealEstateBasic;
  }

  public static async getRealEstateType(
    realEstateId: number
  ): Promise<RealEstateType> {
    const response = (await this.instance.get(
      `/real-estates/${realEstateId}/type`,
      {
        ...this.defaultConfig,
      }
    )) as ApiResponseEntity<RealEstateType>;
    return response.data.result as RealEstateType;
  }

  public static async getRealEstateMarketPriceParam(
    realEstateId: number
  ): Promise<RealEstateMarketPriceParam> {
    const response = (await this.instance.get(
      `/real-estates/${realEstateId}/market-price`,
      {
        ...this.defaultConfig,
      }
    )) as ApiResponseEntity<RealEstateMarketPriceParam>;
    return response.data.result as RealEstateMarketPriceParam;
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

  public static async signUp(emailSignUp: EmailSignUpRequest): Promise<number> {
    try {
      const response = await this.instance.post('/users/signup', emailSignUp);
      return response.status;
    } catch (error) {
      console.error('Error sending email:', error); // 요청 실패 시 false 반환
      return 400;
    }
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

  // 회원 정보 조회
  public static async getUserInfo(): Promise<UserInfoResponse> {
    const response = (await this.instance.get(
      'users/me'
    )) as ApiResponseEntity<UserInfoResponse>;
    return response.data.result as UserInfoResponse;
  }

  // 채팅방 생성
  public static async createChat(
    chatCreateRequest: ChatCreateRequest
  ): Promise<ChatRoom> {
    const response = await this.instance.post<{
      message: string;
      result: { count: number; chatrooms: ChatRoom[] };
    }>(`/chat/create`, chatCreateRequest, this.defaultConfig);
    if (response.data.result.chatrooms.length > 0) {
      return response.data.result.chatrooms[0];
    } else {
      throw new Error('No chatrooms found in the response.');
    }
  }

  // 지난 상담 내역 리스트 가져오기
  public static async getCompletedChatroomsByUserId(
    accessToken: string
  ): Promise<ChatRoom[]> {
    const response = await this.instance.get<{
      message: string;
      result: {
        count: number;
        chatrooms: ChatRoom[];
      };
    }>(`/chat/completed-chatrooms`, {
      headers: {
        ...this.defaultConfig.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.result.chatrooms;
  }

  // 특정 상태의 채팅방 가져오기
  public static async findRoomDetails(
    accessToken: string,
    status: string
  ): Promise<ChatRoomDTO | null> {
    const response = await this.instance.get<{
      message: string;
      result: ChatRoomDTO;
    }>(`/chat/findRoom`, {
      params: { chatroomStatus: status },
      headers: {
        ...this.defaultConfig.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.result;
  }

  // 채팅방 상태 업데이트
  public static async updateChatroomStatus(
    chatroomId: string,
    currentState: string
  ): Promise<ChatRoomDTO> {
    const response = await this.instance.put<{
      message: string;
      result: {
        count: number;
        chatrooms: ChatRoomDTO[];
      };
    }>(
      `/chat/update-status`,
      { chatroomId, state: currentState },
      this.defaultConfig
    );
    if (response.data.result.chatrooms.length > 0) {
      return response.data.result.chatrooms[1];
    } else {
      throw new Error('No chatrooms found in the response.');
    }
  }

  // 채팅방 삭제
  public static async deleteChatroom(chatroomId: string): Promise<void> {
    const response = await this.instance.delete<{
      message: string;
      result: null;
    }>(`/chat/delete/${chatroomId}`);
  }

  // chatroomId로 채팅 내역 가져오기
  public static async getChatroomMessagesByChatroomId(
    chatroomId: string
  ): Promise<ChatMessage[]> {
    try {
      if (!chatroomId) {
        throw new Error('chatroomId is required.');
      }

      console.log(`Fetching messages for chatroomId: ${chatroomId}`);

      const response = await this.instance.get<{
        message: string;
        result: {
          count: number;
          messages: ChatMessage[];
        };
      }>(`/chat/${chatroomId}/messages`, {
        ...this.defaultConfig,
      });

      console.log('API Response:', response.data);

      return response.data.result.messages;
    } catch (error) {
      console.error('Error fetching chatroom messages:', error);

      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error('No messages found for the given chatroomId.');
        return [];
      }

      throw error;
    }
  }

  public static async getBookmarkRealEstates(): Promise<RealEstateList> {
    const response = (await this.instance.get('/users/bookmarks/real-estates', {
      ...this.defaultConfig,
    })) as ApiResponseEntity<RealEstateList>;
    return response.data.result as RealEstateList;
  }

  public static async getRealEstateMarketPrice(
    realEstateMarketPriceParam: RealEstateMarketPriceParam,
    tradeType: string
  ): Promise<RealEstateMarketPrice> {
    const response = await axios.get(
      '/real-estate-api/front-api/v1/complex/pyeong/realPrice',
      {
        params: {
          complexNumber: realEstateMarketPriceParam.complexNumber,
          pyeongTypeNumber: realEstateMarketPriceParam.pyeongTypeNumber,
          tradeType: tradeType,
        },
      }
    );
    return response.data as RealEstateMarketPrice;
  }

  public static async getLoanRecommend(
    realEstateIds: RealEstateIds
  ): Promise<LoanRecommend> {
    const response = (await this.instance.get(`/loan`, {
      ...this.defaultConfig,
      params: realEstateIds,
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    })) as ApiResponseEntity<LoanRecommend>;
    return response.data.result as LoanRecommend;
  }

  public static async getLoanDetail(loanId: number): Promise<LoanDetail> {
    const response = (await this.instance.get(`/loan/detail/${loanId}`, {
      ...this.defaultConfig,
    })) as ApiResponseEntity<LoanDetail>;
    return response.data.result as LoanDetail;
  }

  public static async getConsultingUserInfo(): Promise<LoanRecommend> {
    const response = await this.instance.get(`/chat/user`, {
      ...this.defaultConfig,
    });
    return response.data as LoanRecommend;
  }

  public static async addBookmarkRealEstate(
    realEstateId: number
  ): Promise<number> {
    const response = await this.instance.post(
      `/users/bookmarks/real-estates/${realEstateId}`,
      {
        ...this.defaultConfig,
      }
    );
    return response.status;
  }

  public static async removeBookmarkRealEstate(
    realEstateId: number
  ): Promise<number> {
    const response = await this.instance.delete(
      `/users/bookmarks/real-estates/${realEstateId}`
    );
    return response.status;
  }

  public static async putPropertyValue(
    propertyType: string,
    propertyValue: string
  ): Promise<number> {
    const response = await this.instance.put(
      `/users/property?type=${propertyType}&value=${propertyValue}`
    );

    return response.status;
  }

  public static async getRecentVisitedRealEstateList(
    recentVisitedRealEstatesIds: RecentVisitedRealEstatesIds
  ): Promise<RealEstateList> {
    const params = new URLSearchParams();
    recentVisitedRealEstatesIds.realEstateIds.forEach((id) =>
      params.append('realEstatesIds', id)
    );
    const response = (await this.instance.get(
      `/real-estates/recent-visited-list`,
      {
        params: params,
      }
    )) as ApiResponseEntity<RealEstateList>;
    return response.data.result as RealEstateList;
  }

  public static async getBookmarksAreaCode(): Promise<BookmarkArea> {
    const response = (await this.instance.get(
      '/users/bookmarks/area-codes'
    )) as ApiResponseEntity<BookmarkArea>;
    return response.data.result as BookmarkArea;
  }

  public static async getBookmarksAreaCodeStatus(): Promise<BookmarkAreaStatus> {
    const response = (await this.instance.get(
      '/users/bookmarks/area-codes/status'
    )) as ApiResponseEntity<BookmarkAreaStatus>;
    return response.data.result as BookmarkAreaStatus;
  }

  public static async addBookmarksAreaCode(areaCode: string): Promise<number> {
    const response = await this.instance.post(
      `/users/bookmarks/area-codes/${areaCode}`,
      {
        ...this.defaultConfig,
      }
    );
    return response.status;
  }

  public static async removeBookmarksAreaCode(
    areaCode: string
  ): Promise<number> {
    const response = await this.instance.delete(
      `/users/bookmarks/area-codes/${areaCode}`,
      {
        ...this.defaultConfig,
      }
    );
    return response.status;
  }
}

import axios, { AxiosInstance } from 'axios';
import {
  CurrentLocation,
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
}

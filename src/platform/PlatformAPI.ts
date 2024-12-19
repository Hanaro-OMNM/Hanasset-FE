import axios, { AxiosInstance } from 'axios';
import { CurrentLocation } from '../types/hanaAssetRequest.common.ts';
import { CurrentMarkers } from '../types/hanaAssetResponse.common.ts';

export class PlatformAPI {
  static instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
    withCredentials: true,
  });

  private static readonly defaultConfig = {
    headers: { 'Content-Type': 'application/json' },
  };

  public static async getClusteringInfo(
    currentLocationData: CurrentLocation
  ): Promise<CurrentMarkers> {
    const response = await this.instance.get(`/markers/area`, {
      ...this.defaultConfig,
      params: currentLocationData,
    });
    return response.data as CurrentMarkers;
  }
}

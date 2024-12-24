import axios, { AxiosInstance } from 'axios';
import { CurrentLocation } from '../types/hanaAssetRequest.common.ts';
import { ChatCreateRequest } from '../types/hanaAssetRequest.common.ts';
import { ChatRoom } from '../types/hanaAssetResponse.common.ts';
import { CurrentAreaMarkers } from '../types/hanaAssetResponse.common.ts';
import { ChatMessage } from '../types/hanaAssetResponse.common.ts';
import { CurrentChatRooms } from '../types/hanaAssetResponse.common.ts';
import { ChatroomApiResponse } from '../types/hanaAssetResponse.common.ts';
import { ChatRoomDTO } from '../types/hanaAssetResponse.common.ts';

export class PlatformAPI {
  static instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // API 기본 URL
    timeout: 3000, // 요청 시간 제한 (밀리초)
    withCredentials: true, // 쿠키/인증 정보 포함
  });

  private static readonly defaultConfig = {
    headers: { 'Content-Type': 'application/json' },
  };

  // 클러스터링 정보 가져오기
  public static async getClusteringInfo(
    currentLocationData: CurrentLocation
  ): Promise<CurrentAreaMarkers> {
    const response = await this.instance.get(`/markers/area`, {
      ...this.defaultConfig,
      params: currentLocationData,
    });
    return response.data as CurrentAreaMarkers;
  }

  // 채팅방 생성
  public static async createChat(
    chatCreateRequest: ChatCreateRequest
  ): Promise<ChatRoom> {
    try {
      console.log('Creating a new chatroom with request:', chatCreateRequest);

      const response = await this.instance.post<{
        message: string;
        result: { count: number; chatrooms: ChatRoom[] };
      }>(`/chat/create`, chatCreateRequest, this.defaultConfig);

      console.log('Chatroom created successfully:', response.data);

      if (response.data.result.chatrooms.length > 0) {
        return response.data.result.chatrooms[0];
      } else {
        throw new Error('No chatrooms found in the response.');
      }
    } catch (error) {
      console.error('Error creating chatroom:', error);
      throw error;
    }
  }

  public static async getCompletedChatroomsByUserId(
    userId: number
  ): Promise<ChatRoom[]> {
    try {
      console.log(`Requesting completed chatrooms with userId=${userId}`);
      const response = await this.instance.get<{
        message: string;
        result: {
          count: number;
          chatrooms: ChatRoom[];
        };
      }>(`/chat/completed-chatrooms`, {
        params: { userId },
        ...this.defaultConfig,
      });

      console.log('Response:', response.data);
      return response.data.result.chatrooms;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Axios error:',
          error.response?.status,
          error.response?.data
        );
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  // 특정 상태의 채팅방 가져오기
  public static async findRoomDetails(
    userId: number,
    status: string
  ): Promise<ChatRoomDTO | null> {
    try {
      console.log(
        `Fetching chatroom details for userId=${userId}, status=${status}`
      );

      const response = await this.instance.get<{
        message: string;
        result: ChatRoomDTO;
      }>(`/chat/findRoom`, {
        params: { userId, chatroomStatus: status },
        ...this.defaultConfig,
      });

      console.log('Fetched room details:', response.data);
      return response.data.result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.warn(
          `No chatroom found for userId=${userId} with status=${status}.`
        );
        return null;
      }

      console.error('Error fetching chatroom details:', error);
      throw error;
    }
  }

  // 채팅방 상태 업데이트
  public static async updateChatroomStatus(
    chatroomId: string,
    currentState: string
  ): Promise<ChatRoomDTO> {
    try {
      console.log(
        `Updating chatroom status for chatroomId=${chatroomId}, state=${currentState}`
      );

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

      console.log('Response Data:', response.data);

      if (response.data.result.chatrooms.length > 0) {
        return response.data.result.chatrooms[1];
      } else {
        throw new Error('No chatrooms found in the response.');
      }
    } catch (error) {
      console.error('Error updating chatroom status:', error);
      throw error;
    }
  }

  // 특정 채팅방 메시지 가져오기
  public static async getChatroomMessages(
    chatroomId: string
  ): Promise<ChatMessage[]> {
    try {
      console.log(`Fetching messages for chatroomId: ${chatroomId}`);
      const response = await this.instance.get(`/chat/${chatroomId}/messages`);
      console.log('Fetched messages:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  // 채팅방 삭제
  public static async deleteChatroom(chatroomId: string): Promise<void> {
    try {
      console.log(`Deleting chatroom with ID: ${chatroomId}`);

      const response = await this.instance.delete<{
        message: string;
        result: null;
      }>(`/chat/delete/${chatroomId}`);

      console.log(
        `Chatroom deleted successfully. Response:`,
        response.data.message
      );
    } catch (error) {
      console.error(`Error deleting chatroom with ID: ${chatroomId}:`, error);

      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error(`Chatroom with ID ${chatroomId} not found.`);
      }

      throw error;
    }
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
}

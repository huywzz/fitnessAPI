// src/cloudinary/cloudinary.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiConfigService } from '@/shared/services/api-config.service';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly cloudName: string;
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly apiUrl: string;

  constructor(private readonly configService: ApiConfigService) {
    const { cloudName, apiKey, apiSecret, apiUrl } = this.configService.cloudinaryConfig;
    this.cloudName = cloudName;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.apiUrl = apiUrl;

    // Khởi tạo Cloudinary
    cloudinary.config({
      cloud_name: this.cloudName,
      api_key: this.apiKey,
      api_secret: this.apiSecret,
    });
  }

  async uploadImage(file: string) {
    try {
      const result = await cloudinary.uploader.upload(file, {
        folder: 'gif',
      });
      return {
        publicId: result.public_id,
        url: result.secure_url,
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Upload failed',
      });
    }
  }

  async getImageDetails(publicId: string): Promise<any> {
    try {
      const result = await cloudinary.api.resource(publicId);
      return result;
    } catch (error) {
      throw new NotFoundException({
        message: 'Upload failed',
      });
    }
  }

  async deleteImage(publicId: string): Promise<any> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new NotFoundException({
        message: 'Upload failed',
      });
    }
  }
}

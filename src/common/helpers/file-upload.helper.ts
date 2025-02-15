import { extname } from 'path';
import { HttpException, HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export class FileUploadHelper {
  private static readonly ALLOWED_FILE_TYPES = /(jpg|jpeg|png|webp|ico)$/;
  private static readonly MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

  static getFileValidationPipe() {
    return new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: this.ALLOWED_FILE_TYPES,
      })
      .addMaxSizeValidator({
        maxSize: this.MAX_FILE_SIZE
      })
      .build({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST
      });
  }

  static getStorageOptions(destination: string) {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (!existsSync(destination)) {
            mkdirSync(destination, { recursive: true });
          }
          cb(null, destination);
        },
        filename: (req, file, cb) => {
          const date = new Date().toISOString().split('T')[0];
          const time = new Date()
            .toISOString()
            .split('T')[1]
            .split('.')[0]
            .replace(/:/g, '-');
          const uniqueSuffix = date + '-' + time + '-' + uuidv4();

          const fileExtension = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExtension}`);
        },
      }),
      limits: {
        fileSize: this.MAX_FILE_SIZE,
      },
    };
  }

  static async uploadSingle(file: Express.Multer.File, destination: string) {
    try {
      if (!file.filename) {
        throw new HttpException(
          'File upload failed - no filename',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const fileInfo = {
        originalName: file.originalname,
        filename: file.filename,
        path: `${destination}/${file.filename}`,
        size: file.size,
        mimetype: file.mimetype,
      };
      return fileInfo;
    } catch (error) {
      throw new HttpException(
        'Error uploading file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  static async uploadMultiple(
    files: Express.Multer.File[],
    destination: string,
  ) {
    try {
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          return this.uploadSingle(file, destination);
        }),
      );
      return uploadedFiles;
    } catch (error) {
      throw new HttpException(
        'Error uploading files',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

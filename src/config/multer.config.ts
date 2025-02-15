import { MulterModule } from '@nestjs/platform-express';
import { FileUploadHelper } from '@/common/helpers/file-upload.helper';

/**
 * Configures Multer module with default storage options
 * for file uploads across the application
 */
export const MulterConfig = MulterModule.register({
  ...FileUploadHelper.getStorageOptions('uploads'),
});
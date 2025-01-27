import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<any> => {
      try {
        const dbUrl = `${configService.get<string>('DB_TYPE')}://${
          configService.get<string>('DB_USER')}:${
          configService.get<string>('DB_PASSWORD')}@${
          configService.get<string>('DB_HOST')}:${
          configService.get<string>('DB_PORT')}/${
          configService.get<string>('DB_NAME')}?authSource=${
          configService.get<string>('DB_NAME')}`;


        console.log('Successfully connected to MongoDB with URL:', dbUrl);
        console.log(`Database connection established at ${configService.get<string>('DB_HOST')}:${configService.get<string>('DB_PORT')}`);

        return dbUrl;
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      }
    }
  }
];

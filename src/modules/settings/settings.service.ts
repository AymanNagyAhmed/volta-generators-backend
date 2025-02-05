import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from '@prisma/client';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new setting
   * @param createSettingDto Setting creation data
   * @returns Newly created setting
   */
  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    // First check if the section exists
    const section = await this.prisma.siteSection.findUnique({
      where: { title: createSettingDto.sectionTitle },
    });

    if (!section) {
      throw new NotFoundException(`Site section with title ${createSettingDto.sectionTitle} not found`);
    }

    return this.prisma.setting.create({
      data: {
        ...createSettingDto,
        sectionId: section.id,
      },
    });
  }

  /**
   * Retrieves all settings
   * @returns Array of settings
   */
  async findAll(): Promise<Setting[]> {
    return this.prisma.setting.findMany({
      include: {
        section: true,
      },
    });
  }

  /**
   * Finds a setting by ID
   * @param id Setting identifier
   * @returns Setting if found
   * @throws NotFoundException if setting not found
   */
  async findOne(id: string): Promise<Setting> {
    const setting = await this.prisma.setting.findUnique({
      where: { id },
      include: {
        section: true,
      },
    });

    if (!setting) {
      throw new NotFoundException(`Setting with ID ${id} not found`);
    }

    return setting;
  }

  /**
   * Updates a setting
   * @param id Setting identifier
   * @param updateSettingDto Update data
   * @returns Updated setting
   * @throws NotFoundException if setting not found
   */
  async update(id: string, updateSettingDto: UpdateSettingDto): Promise<Setting> {
    await this.findOne(id);

    // If sectionTitle is being updated, verify the new section exists
    if (updateSettingDto.sectionTitle) {
      const section = await this.prisma.siteSection.findUnique({
        where: { title: updateSettingDto.sectionTitle },
      });

      if (!section) {
        throw new NotFoundException(
          `Site section with title ${updateSettingDto.sectionTitle} not found`
        );
      }
    }

    return this.prisma.setting.update({
      where: { id },
      data: updateSettingDto,
    });
  }

  /**
   * Removes a setting
   * @param id Setting identifier
   * @returns Removed setting
   * @throws NotFoundException if setting not found
   */
  async remove(id: string): Promise<Setting> {
    await this.findOne(id);

    return this.prisma.setting.delete({
      where: { id },
    });
  }

  /**
   * Finds settings by section title
   * @param sectionTitle Section title
   * @returns Array of settings
   */
  async findBySection(sectionTitle: string): Promise<Setting[]> {
    return this.prisma.setting.findMany({
      where: {
        sectionTitle,
      },
      include: {
        section: true,
      },
    });
  }
}

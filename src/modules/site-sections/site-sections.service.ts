import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateSiteSectionDto } from './dto/create-site-section.dto';
import { UpdateSiteSectionDto } from './dto/update-site-section.dto';
import { SiteSection } from '@prisma/client';

@Injectable()
export class SiteSectionsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new site section
   * @param createSiteSectionDto Site section creation data
   * @returns Newly created site section
   */
  async create(createSiteSectionDto: CreateSiteSectionDto): Promise<SiteSection> {
    return this.prisma.siteSection.create({
      data: createSiteSectionDto,
    });
  }

  /**
   * Retrieves all site sections
   * @returns Array of site sections
   */
  async findAll(): Promise<SiteSection[]> {
    return this.prisma.siteSection.findMany({
      include: {
        settings: true,
      },
    });
  }

  /**
   * Finds a site section by ID
   * @param id Site section identifier
   * @returns Site section if found
   * @throws NotFoundException if site section not found
   */
  async findOne(id: string): Promise<SiteSection> {
    const siteSection = await this.prisma.siteSection.findUnique({
      where: { id },
      include: {
        settings: true,
      },
    });

    if (!siteSection) {
      throw new NotFoundException(`Site section with ID ${id} not found`);
    }

    return siteSection;
  }

  /**
   * Updates a site section
   * @param id Site section identifier
   * @param updateSiteSectionDto Update data
   * @returns Updated site section
   * @throws NotFoundException if site section not found
   */
  async update(id: string, updateSiteSectionDto: UpdateSiteSectionDto): Promise<SiteSection> {
    await this.findOne(id);

    return this.prisma.siteSection.update({
      where: { id },
      data: updateSiteSectionDto,
    });
  }

  /**
   * Removes a site section
   * @param id Site section identifier
   * @returns Removed site section
   * @throws NotFoundException if site section not found
   */
  async remove(id: string): Promise<SiteSection> {
    await this.findOne(id);

    return this.prisma.siteSection.delete({
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inquiry } from './domain/inquiry.entity';
import { User } from 'src/users/domain/user.entity';
import { CreateInquiryDto } from './dtos';
import { QueryInquiriesDto } from './dtos/query-inquiries.dto';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(Inquiry) private repo: Repository<Inquiry>
  ) { }

  createInquiry(dto: CreateInquiryDto, currentUser: User) {
    const inquiry = this.repo.create(dto);
    inquiry.user = currentUser;

    return this.repo.save(inquiry);
  }

  async updateInquiry(id: number, attrs: Partial<Inquiry>) {
    const inquiry = await this.repo.findOneBy({ id });
    if (!inquiry) return undefined;

    const updatedInquiry = {
      ...inquiry,
      ...attrs
    };

    return this.repo.save(updatedInquiry);
  }

  findInquiries() {
    return this.repo.find({
      relations: {
        user: true
      }
    });
  }

  queryInquiries({ client, product, issuedAt, count, pageNumber }: QueryInquiriesDto) {
    return this.repo.createQueryBuilder()
      .select('*')
      .where(product ? 'lower(product) = :product' : 'TRUE', { product: product.toLowerCase() })
      .andWhere(client ? 'lower(client) = :client' : 'TRUE', { client: client.toLowerCase() })
      .andWhere(issuedAt ? "issuedAt = :issuedAt" : 'TRUE', { issuedAt })
      .orderBy('issuedAt', 'DESC')
      .setParameters({ issuedAt })
      .skip(pageNumber * count)
      .take(count)
      .getRawMany();
  }

  findById(id: number) {
    return this.repo.find({
      where: { id },
      relations: { user: true }
    });
  }

  async removeInquiry(id: number) {
    const inquiry = await this.repo.findOneBy({ id });
    if (!inquiry) return undefined;

    return this.repo.remove(inquiry);
  }
}

import { Injectable } from '@nestjs/common';
import { Site } from './interface/site.interface';

@Injectable()
export class SiteService {
  private readonly sites: Site[] = [];

  create(site: Site) {
    this.sites.push(site);
  }

  query(): Site[] {
    return this.sites;
  }
}

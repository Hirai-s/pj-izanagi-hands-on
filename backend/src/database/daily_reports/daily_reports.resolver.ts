import {
    CreateOnedailyReportsArgs,
    DeleteOnedailyReportsArgs,
    FindFirstdailyReportsArgs,
    FindManydailyReportsArgs,
    FindUniquedailyReportsArgs,
    daily_reports,
    UpdateOnedailyReportsArgs,
} from '../../@generated/prisma-nestjs-graphql/index';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DailyReportsService } from './daily_reports.service';

@Resolver()
export class DailyReportsResolver {
  constructor(private readonly service: DailyReportsService) {}

  @Query(() => daily_reports, { name: 'DailyReports', nullable: true })
  async DailyReports(@Args() args: FindUniquedailyReportsArgs) {
    return this.service.findUnique({ ...args });
  }

  @Query(() => daily_reports, { name: 'DailyReportsFirst', nullable: true })
  async dailyReportsFirst(@Args() args: FindFirstdailyReportsArgs) {
    return this.service.findFirst({ ...args });
  }

  @Query(() => [daily_reports], { name: 'DailyReportsList' })
  async dailyReportsList(@Args() args: FindManydailyReportsArgs) {
    return this.service.findMany({ ...args });
  }

  @Mutation(() => daily_reports, { name: 'CreateDailyReports' })
  async createDailyReports(@Args() args: CreateOnedailyReportsArgs) {
    return this.service.create({ ...args });
  }

  @Mutation(() => daily_reports, { name: 'UpdateDailyReports' })
  async updateDailyReports(@Args() args: UpdateOnedailyReportsArgs) {
    return this.service.update({ ...args });
  }

  @Mutation(() => daily_reports, { name: 'DeleteDailyReports' })
  async deleteDailyReports(@Args() args: DeleteOnedailyReportsArgs) {
    return this.service.delete({ ...args });
  }
}
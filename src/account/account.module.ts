import { Module } from "@nestjs/common";
import { UserModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [UserModule, AuthModule, SettingsModule],
})
export class AccountModule {}

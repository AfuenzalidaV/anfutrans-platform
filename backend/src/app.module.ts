import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { UsuariosModule } from './usuarios/usuarios.module'
import { SociosModule } from './socios/socios.module'
import { TramitesModule } from './tramites/tramites.module'
import { BeneficiosModule } from './beneficios/beneficios.module'
import { ContenidosModule } from './contenidos/contenidos.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,
    AuthModule,
    UsuariosModule,
    SociosModule,
    TramitesModule,
    BeneficiosModule,
    ContenidosModule
  ],
})
export class AppModule {}

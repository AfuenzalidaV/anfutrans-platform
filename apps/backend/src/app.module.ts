import { Module } from '@nestjs/common';
import { RegionesModule } from './catalogos/regiones/regiones.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SociosModule } from './socios/socios.module';
import { TramitesModule } from './tramites/tramites.module';
import { BeneficiosModule } from './beneficios/beneficios.module';
import { ContenidosModule } from './contenidos/contenidos.module';
import { ComunasModule } from './catalogos/comunas/comunas.module';
import { TipoDocumentoModule } from './catalogos/tipo-documento/tipo-documento.module';
import { TipoBeneficioModule } from './catalogos/tipo-beneficio/tipo-beneficio.module';
import { TipoCertificadoModule } from './catalogos/tipo-certificado/tipo-certificado.module';
import { EstadoSolicitudModule } from './catalogos/estado-solicitud/estado-solicitud.module';
import { ParametrosModule } from './catalogos/parametros/parametros.module';
import { CargosDirigencialesModule } from './catalogos/cargos-dirigenciales/cargos-dirigenciales.module';
import { TipoSolicitudModule } from './catalogos/tipo-solicitud/tipo-solicitud.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    RegionesModule,
    ComunasModule,
    TipoDocumentoModule,
    TipoBeneficioModule,
    TipoCertificadoModule,
    EstadoSolicitudModule,
    TipoSolicitudModule,
    ParametrosModule,
    CargosDirigencialesModule,
    DatabaseModule,
    AuthModule,
    UsuariosModule,
    SociosModule,
    TramitesModule,
    BeneficiosModule,
    ContenidosModule,
  ],
})
export class AppModule {}

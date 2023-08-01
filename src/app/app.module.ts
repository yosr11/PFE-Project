import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ServiceWorkerModule } from '@angular/service-worker';




const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    
    declarations: [
        AppComponent,
        
        
        
        
     
    ],
    imports     : [
       MatSlideToggleModule,
       MatIconModule,
        BrowserModule,
        
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
         provideFirebaseApp(() => initializeApp(environment.firebase)),
         provideAnalytics(() => getAnalytics()),
         provideAuth(() => getAuth()),
         provideDatabase(() => getDatabase()),
         provideFirestore(() => getFirestore()),
         provideFunctions(() => getFunctions()),
         provideMessaging(() => getMessaging()),
         providePerformance(() => getPerformance()),
         provideRemoteConfig(() => getRemoteConfig()),
         provideStorage(() => getStorage()),
         ServiceWorkerModule.register('ngsw-worker.js', {
           enabled: !isDevMode(),
           // Register the ServiceWorker as soon as the application is stable
           // or after 30 seconds (whichever comes first).
           registrationStrategy: 'registerWhenStable:30000'
         }),
        
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
      ScreenTrackingService,UserTrackingService
    ]
})
export class AppModule
{
}

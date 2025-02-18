import { provideFirebaseApp, initializeApp, FirebaseApp } from '@angular/fire/app';
import { Injector } from '@angular/core';
import { provideFirestore, initializeFirestore, persistentLocalCache } from '@angular/fire/firestore';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './app/app.config';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore((injector: Injector) => {
      const app = injector.get(FirebaseApp);
      const firestore = initializeFirestore(app, {
        localCache: persistentLocalCache()
      });
      return firestore;
    }),
    provideRouter(routes)
  ],
});
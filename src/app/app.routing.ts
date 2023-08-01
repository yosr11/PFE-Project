import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    { path: '', pathMatch: 'full', redirectTo: '/dashboards/listeBateaux' },

    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: '/dashboards/listeBateaux' },

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password/:id_client', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) },
        ]

    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [

            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },


    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [

            // Dashboards
            {
                path: 'dashboards', children: [
                    { path: 'listeBateaux', loadChildren: () => import('app/modules/admin/dashboards/liste-bateaux/liste-bateaux.module').then(m => m.ListeBateauxModule) },
                    { path: 'navigation', loadChildren: () => import('app/modules/admin/dashboards/navigation/navigation.module').then(m => m.NavigationModule) },
                    { path: 'controle', loadChildren: () => import('app/modules/admin/dashboards/controle/controle.module').then(m => m.ControleModule) },
                    { path: 'commande', loadChildren: () => import('app/modules/admin/dashboards/commande/commande.module').then(m => m.CommandeModule) },
                    { path: 'SOS', loadChildren: () => import('app/modules/admin/dashboards/sos/sos.module').then(m => m.SOSModule) },
                    { path: 'historique', loadChildren: () => import('app/modules/admin/dashboards/historique/historique.module').then(m => m.HistoriqueModule) },
                    {
                        path: 'outils-navigation', children: [

                            { path: 'geofence', loadChildren: () => import('app/modules/admin/dashboards/outils-navigation/geofence/geofence.module').then(m => m.GeofenceModule) },
                            { path: 'waypoint', loadChildren: () => import('app/modules/admin/dashboards/outils-navigation/waypoint/waypoint.module').then(m => m.WaypointModule) },
                        ]
                    },
                    { path: 'paramètres', loadChildren: () => import('app/modules/admin/dashboards/parametres/parametres.module').then(m => m.ParametresModule) },
                    { path: 'formBateau', loadChildren: () => import('app/modules/admin/dashboards/form-bateau/form-bateau.module').then(m => m.FormBateauModule) },
                    { path: 'formWaypoint', loadChildren: () => import('app/modules/admin/dashboards/form-waypoint/form-waypoint.module').then(m => m.FormWaypointModule) },
                    { path: 'formGeofence', loadChildren: () => import('app/modules/admin/dashboards/form-geofence/form-geofence.module').then(m => m.FormGeofenceModule) },
                    { path: 'editBateau/:id_bateau', loadChildren: () => import('app/modules/admin/dashboards/edit-bateau/edit-bateau.module').then(m => m.EditBateauModule) },
                    { path: 'profil', loadChildren: () => import('app/modules/admin/dashboards/profil/profil.module').then(m => m.ProfilModule) },
                    { path: 'editBateau/:id_bateau', loadChildren: () => import('app/modules/admin/dashboards/edit-bateau/edit-bateau.module').then(m => m.EditBateauModule) },
                    { path: 'editGeofence', loadChildren: () => import('app/modules/admin/dashboards/outils-navigation/geofence/editgeofence/editgeofence.module').then(m => m.EditgeofenceModule) },
                    { path: 'WaypointDialog', loadChildren: () => import('app/modules/admin/dashboards/waypoint-dialog/waypoint-dialog.module').then(m => m.WaypointDialogModule) },
                    { path: 'historique-notification', loadChildren: () => import('app/modules/admin/dashboards/historique-notification/historique-notification.module').then(m => m.HistoriqueNotificationModule) },
                ]
            },

            { path: 'meteo', loadChildren: () => import('app/layout/common/meteo/meteo.module').then(m => m.MeteoModule) },
            { path: 'notifications', loadChildren: () => import('app/layout/common/notifications/notifications.module').then(m => m.NotificationsModule) },

            // Pages
            {
                path: 'pages', children: [

                    // Activities
                    { path: 'activities', loadChildren: () => import('app/modules/admin/pages/activities/activities.module').then(m => m.ActivitiesModule) },

                    // Authentication
                    { path: 'authentication', loadChildren: () => import('app/modules/admin/pages/authentication/authentication.module').then(m => m.AuthenticationModule) },

                    // Coming Soon
                    { path: 'coming-soon', loadChildren: () => import('app/modules/admin/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule) },

                    // Error
                    {
                        path: 'error', children: [
                            { path: '404', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
                            { path: '500', loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module) }
                        ]
                    },

                    // Invoice
                    {
                        path: 'invoice', children: [
                            {
                                path: 'printable', children: [
                                    { path: 'compact', loadChildren: () => import('app/modules/admin/pages/invoice/printable/compact/compact.module').then(m => m.CompactModule) },
                                    { path: 'modern', loadChildren: () => import('app/modules/admin/pages/invoice/printable/modern/modern.module').then(m => m.ModernModule) }
                                ]
                            }
                        ]
                    },

                    // Maintenance
                    { path: 'maintenance', loadChildren: () => import('app/modules/admin/pages/maintenance/maintenance.module').then(m => m.MaintenanceModule) },

                    // Pricing
                    {
                        path: 'pricing', children: [
                            { path: 'modern', loadChildren: () => import('app/modules/admin/pages/pricing/modern/modern.module').then(m => m.PricingModernModule) },
                            { path: 'simple', loadChildren: () => import('app/modules/admin/pages/pricing/simple/simple.module').then(m => m.PricingSimpleModule) },
                            { path: 'single', loadChildren: () => import('app/modules/admin/pages/pricing/single/single.module').then(m => m.PricingSingleModule) },
                            { path: 'table', loadChildren: () => import('app/modules/admin/pages/pricing/table/table.module').then(m => m.PricingTableModule) }
                        ]
                    },

                    // Profile
                    //{path: 'profile', loadChildren: () => import('app/modules/admin/pages/profile/profile.module').then(m => m.ProfileModule)},

                    // Settings
                    // {path: 'settings', loadChildren: () => import('app/modules/admin/pages/settings/settings.module').then(m => m.SettingsModule)},
                ]
            },

            // User Interface
            {
                path: 'ui', children: [

                    // Material Components
                    { path: 'material-components', loadChildren: () => import('app/modules/admin/ui/material-components/material-components.module').then(m => m.MaterialComponentsModule) },

                    // Fuse Components
                    { path: 'fuse-components', loadChildren: () => import('app/modules/admin/ui/fuse-components/fuse-components.module').then(m => m.FuseComponentsModule) },

                    // Other Components
                    { path: 'other-components', loadChildren: () => import('app/modules/admin/ui/other-components/other-components.module').then(m => m.OtherComponentsModule) },

                    // TailwindCSS
                    { path: 'tailwindcss', loadChildren: () => import('app/modules/admin/ui/tailwindcss/tailwindcss.module').then(m => m.TailwindCSSModule) },

                    // Advanced Search
                    { path: 'advanced-search', loadChildren: () => import('app/modules/admin/ui/advanced-search/advanced-search.module').then(m => m.AdvancedSearchModule) },

                    // Animations
                    { path: 'animations', loadChildren: () => import('app/modules/admin/ui/animations/animations.module').then(m => m.AnimationsModule) },

                    // Cards
                    { path: 'cards', loadChildren: () => import('app/modules/admin/ui/cards/cards.module').then(m => m.CardsModule) },

                    // Colors
                    { path: 'colors', loadChildren: () => import('app/modules/admin/ui/colors/colors.module').then(m => m.ColorsModule) },

                    // Confirmation Dialog
                    { path: 'confirmation-dialog', loadChildren: () => import('app/modules/admin/ui/confirmation-dialog/confirmation-dialog.module').then(m => m.ConfirmationDialogModule) },

                    // Datatable
                    { path: 'datatable', loadChildren: () => import('app/modules/admin/ui/datatable/datatable.module').then(m => m.DatatableModule) },

                    // Forms
                    {
                        path: 'forms', children: [
                            { path: 'fields', loadChildren: () => import('app/modules/admin/ui/forms/fields/fields.module').then(m => m.FormsFieldsModule) },
                            { path: 'layouts', loadChildren: () => import('app/modules/admin/ui/forms/layouts/layouts.module').then(m => m.FormsLayoutsModule) },
                            { path: 'wizards', loadChildren: () => import('app/modules/admin/ui/forms/wizards/wizards.module').then(m => m.FormsWizardsModule) }
                        ]
                    },

                    // Icons
                    { path: 'icons', loadChildren: () => import('app/modules/admin/ui/icons/icons.module').then(m => m.IconsModule) },

                    // Page Layouts
                    { path: 'page-layouts', loadChildren: () => import('app/modules/admin/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule) },

                    // Typography
                    { path: 'typography', loadChildren: () => import('app/modules/admin/ui/typography/typography.module').then(m => m.TypographyModule) }
                ]
            },

            // Documentation
            {
                path: 'docs', children: [

                    // Changelog
                    { path: 'changelog', loadChildren: () => import('app/modules/admin/docs/changelog/changelog.module').then(m => m.ChangelogModule) },

                    // Guides
                    { path: 'guides', loadChildren: () => import('app/modules/admin/docs/guides/guides.module').then(m => m.GuidesModule) }
                ]
            },

            // 404 & Catch all
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
            { path: '**', redirectTo: '404-not-found' }
        ]
    }
];

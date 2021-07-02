import React from "react";
import { Route, Switch } from "react-router-dom";

import MainWrapper from "./MainWrapper";
import PrivateRoute from "./PrivateRoute";
import FallbackSpinner from "../../shared/components/FallbackSpinner";

import LogIn from "../login/index";
import DefaultDashboard from "../home/index";
import AddOffer from "../add-offer/index";
import AddFormation from "../add-formation";
import EntrepriseDetails from "../entreprise-detail/index";
import EcoleDetails from "../school-detail/index";
import ProfileDetails from "../profile/index";
import ChangePassword from "../change-password/index";
import Settings from "../settings/index";
import EmailDetail from "../email/index";
import OffersList from "../offers/index";
import ForamtionList from "../formation/formations";
import MyOffers from "../my-offers/index";
import OfferDetails from "../offer-detail/index";
import FormationDetails from "../formation/formation-detail";
import MesActualité from "../actualité/index";
import AddActualité from "../add-actualité/index";
import actualitéDetails from "../actualité-details/index";
import CandidatProfil from "../candidat/index";
import CandidatsList from "../candidats/index";
import MyCandidatsList from "../my-candidats/index";
import EntreprisesList from "../entreprises/index";
import SchoolsList from "../schools/index";
import CandidatDetails from "../candidat-edit/index";
import EditOffer from "../offer-edit/index";
import EditFormation from "../formation/formation-edit";
import Statics from "../statics/index";
import AdminsList from "../admins/index";
import AdminAdd from "../admin-add/index";
import AdminEdit from "../admin-edit/index";
import CompetencesList from "../competences/index";
import JobsList from "../jobs/index";
import SoftskillsList from "../softskils";

import EntrepriseOffers from "../offers-by-entreprise/index";

const privateRoutes = [
  {
    path: ["/", "/accueil"],
    component: DefaultDashboard,
    exact: true
  },
  {
    path: "/creation-une-offre",
    component: AddOffer,
    exact: true
  },
  {
    path: "/creation-une-formation",
    component: AddFormation,
    exact: true
  },
  {
    path: "/ajouter-admin",
    component: AdminAdd,
    exact: true
  },
  {
    path: "/compte",
    component: ProfileDetails,
    exact: true
  },
  {
    path: ["/entreprise/:num", "/ajouter-entreprise"],
    component: EntrepriseDetails,
    exact: true
  },
  {
    path: ["/entreprise/:num", "/ajouter-ecole"],
    component: EcoleDetails,
    exact: true
  },
  {
    path: "/parametres",
    component: Settings,
    exact: true
  },
  {
    path: "/administrateurs",
    component: AdminsList,
    exact: true
  },
  {
    path: "/competences",
    component: CompetencesList,
    exact: true
  },
  {
    path: "/metiers",
    component: JobsList,
    exact: true
  },

  {
    path: "/softskills",
    component: SoftskillsList,
    exact: true
  },

  {
    path: "/statistique",
    component: Statics,
    exact: true
  },
  {
    path: "/changer-mot-de-passe",
    component: ChangePassword,
    exact: true
  },
  {
    path: "/offres",
    component: OffersList,
    exact: true
  },
  {
    path: "/mes-offres",
    component: MyOffers,
    exact: true
  },
  {
    path: "/les-offres-entreprise/:num",
    component: EntrepriseOffers,
    exact: true
  },
  {
    path: "/offre/:num",
    component: OfferDetails,
    exact: true
  },
  {
    path: "/formations",
    component: ForamtionList,
    exact: true
  },
  {
    path: "/formation/:num",
    component: FormationDetails,
    exact: true
  },
  {
    path: "/modifier-formation/:num",
    component: EditFormation,
    exact: true
  },
  {
    path: ["/admin/:num", "/admin"],
    component: AdminEdit,
    exact: true
  },
  {
    path: "/modifier-offre/:num",
    component: EditOffer,
    exact: true
  },

  {
    path: "/emails/:id",
    component: EmailDetail,
    exact: true
  },
  {
    path: "/candidat/:num",
    component: CandidatProfil,
    exact: true
  },
  {
    path: "/modifier-candidat/:num",
    component: CandidatDetails,
    exact: true
  },
  {
    path: "/candidats",
    component: CandidatsList,
    exact: true
  },
  {
    path: "/mes-candidats",
    component: MyCandidatsList,
    exact: true
  },

  {
    path: "/entreprises",
    component: EntreprisesList,
    exact: true
  },
  {
    path: "/écoles",
    component: SchoolsList,
    exact: true
  },
  {
    path: "/Les Actus Rh",
    component: MesActualité,
    exact: true
  },
  {
    path: "/creation-une-actualité",
    component: AddActualité,
    exact: true
  },
  {
    path: "/actualité/:num",
    component: actualitéDetails,
    exact: true
  },
];
const publicRoutes = [
  {
    path: ["/connexion/:token", "/connexion"],
    component: LogIn
  }
  /*  {
    path: "/mot-passe-oublie",
    component: ForgotPassword
  } */
];

const Router = () => (
  <React.Suspense fallback={<FallbackSpinner />}>
    <MainWrapper>
      <main>
        <Switch>
          {publicRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))}
          <PrivateRoute>
            <Switch>
              {privateRoutes.map(route => (
                <Route key={route.path} {...route} />
              ))}
            </Switch>
          </PrivateRoute>
        </Switch>
      </main>
    </MainWrapper>
  </React.Suspense>
);

export default Router;

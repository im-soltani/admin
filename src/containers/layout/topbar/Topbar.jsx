import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TopbarSidebarButton from "./TopbarSidebarButton";
import TopbarProfile from "./TopbarProfile";
import Icon from "../../../shared/components/Icon";
const routes = [
  {
    label: "Accueil",
    to: "/accueil",
    icon: "home"
  },
  {
    label: "Mon organisation",
    to: "/compte",
    icon: "my-account"
  },
  {
    label: "Profil d'un admin",
    to: "/admin/",
    icon: "admins"
  },
  {
    label: "Mes CV",
    to: "/mes-cv",
    icon: "my-cv"
  },
  {
    label: "Ajout d'un autre administrateur",
    to: "/ajouter-admin",
    icon: "admins"
  },
  {
    label: "Administrateurs",
    to: "/administrateurs",
    icon: "admins"
  },
  {
    label: "Création d'une offre d'emploi",
    to: "/creation-une-offre",
    icon: "offers-icon"
  },
  {
    label: "Mes offres",
    to: "/mes-offres",
    icon: "offers-icon"
  },
  {
    label: "Les offres d'une entreprise",
    to: "/les-offres-entreprise",
    icon: "offers-icon"
  },

  {
    label: "Les offres d'emploi",
    to: "/offres",
    icon: "offers-icon"
  },
  {
    label: "Détail d'une offre",
    to: "/offre/",
    icon: "offers-icon"
  },
  {
    label: "Modifier une offre",
    to: "/modifier-offre/",
    icon: "offers-icon"
  },
  {
    label: "Création d'une formation",
    to: "/creation-une-formation",
    icon: "offers-icon"
  },
  {
    label: "Les formations d'une entreprise",
    to: "/les-formations-entreprise",
    icon: "offers-icon"
  },

  {
    label: "Les offres de formation",
    to: "/formations",
    icon: "offers-icon"
  },
  {
    label: "Détail d'une formation",
    to: "/formation/",
    icon: "offers-icon"
  },
  {
    label: "Modifier une formation",
    to: "/modifier-formation/",
    icon: "offers-icon"
  },
  {
    label: "Modifier un candidat",
    to: "/modifier-candidat/",
    icon: "candidats"
  },
  {
    label: "Ajout d'une entreprise",
    to: "/ajouter-entreprise",
    icon: "entreprises"
  },
  {
    label: "Ajout d'une ecole",
    to: "/ajouter-ecole",
    icon: "entreprises"
  },
  {
    label: "Détail d'une entreprise",
    to: "/entreprise/",
    icon: "entreprises"
  },
  {
    label: "Détail d'un candidat",
    to: "/candidat/",
    icon: "candidats"
  },
  {
    label: "Paramètres",
    to: "/parametres",
    icon: "settings"
  },
  {
    label: "Statistiques",
    to: "/statistique",
    icon: "stats"
  },
  {
    label: "Les entreprises",
    to: "/entreprises",
    icon: "entreprises"
  },
  {
    label: "Les écoles",
    to: "/écoles",
    icon: "entreprises"
  },
  {
    label: "Les compétences",
    to: "/competences",
    icon: "menu-competences"
  },
  {
    label: "Les métiers",
    to: "/metiers",
    icon: "menu-jobs"
  },
  {
    label: "Les softskills",
    to: "/softskills",
    icon: "menu-jobs"
  },
  {
    label: "Les candidats",
    to: "/candidats",
    icon: "candidats"
  },
  {
    label: "Mes candidats",
    to: "/mes-candidats",
    icon: "candidats"
  },

  {
    label: "Changer le mot de passe",
    to: "/changer-mot-de-passe",
    icon: "settings"
  },

  {
    label: "Les Actus RH",
    to: "/Les Actus Rh",
    icon: "offers-icon"
  },
  {
    label: "Modifier une Actus RH",
    to: "/creation-une-actualité",
    icon: "offers-icon"
  },
  {
    label: "Détail d'une Actus RH",
    to: "/actualité/",
    icon: "offers-icon"
  },
];
class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
    sidebarCollapse: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  render() {
    const {
      changeMobileSidebarVisibility,
      changeSidebarVisibility
    } = this.props;

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            />
            <div className="Topbar-divs">
              {this.props.location.pathname === "/" && (
                <div style={{ width: "100%" }}>
                  <Icon className="Topbar-icons" name={"home"} />
                  <span className="Topbar-spans">Accueil</span>
                </div>
              )}
              {routes.map((route, index) => {
                if (
                  (this.props.location.pathname !== "/" &&
                    this.props.location.pathname === route.to) ||
                  (this.props.location &&
                    this.props.location.pathname.length !== 1 &&
                    this.props.location.pathname !== "/" &&
                    this.props.location.pathname.includes(route.to))
                )
                  return (
                    <div key={index} style={{ width: "100%" }}>
                      <Icon className="Topbar-icons" name={route.icon} />
                      <span className="Topbar-spans">{route.label}</span>
                    </div>
                  );
              })}
            </div>
          </div>
          <div className="topbar__right">
            <TopbarProfile />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Topbar);

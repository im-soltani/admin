import gql from "graphql-tag";

export const GET_COMPETENCES = gql`
  query getCompetences($search: String, $skip: Int, $limit: Int) {
    getCompetences(search: $search, skip: $skip, limit: $limit) {
      totalCount
      competences {
        id
        name
      }
    }
  }
`;

export const GET_JOBS = gql`
  query getJobs($search: String, $skip: Int, $limit: Int) {
    getJobs(search: $search, skip: $skip, limit: $limit) {
      totalCount
      jobs {
        id
        name
      }
    }
  }
`;

export const GET_SOFTSKILLS = gql`
  query getSoftskills($search: String, $skip: Int, $limit: Int) {
    getSoftskills(search: $search, skip: $skip, limit: $limit) {
      totalCount
      softskills {
        id
        name
      }
    }
  }
`;

export const GET_CANDIDAT_BY_NUM = gql`
  query getCandidatByNum($num: Int!) {
    getCandidatByNum(num: $num) {
      id
      last_name
      first_name
      jobs
      num
      job_id
      competences
      softskills
      note
      address
      disponibility
      letter
      contract
      experience
      entreprises {
        rating
        id
      }
      tel
      etude
      profile_pic_url
      address
      cv
      cv_eng
      profile {
        id
        email
        is_blocked
        is_blocked_by_admin
      }
      createdAt
    }
  }
`;

export const GET_APPLICATIONS = gql`
  query getApplications($skip: Int, $limit: Int) {
    getApplications(skip: $skip, limit: $limit) {
      totalCount
      applications {
        id
        offer {
          id
          name
        }
        entreprise {
          id
          name
        }
        state
        createdAt
      }
    }
  }
`;

export const GET_ADMIN_OFFERS_BY_STATUS = gql`
  query getAdminOffersByState(
    $state: String
    $search: String
    $skip: Int
    $limit: Int
    $field: String
    $direction: Int
  ) {
    getAdminOffersByState(
      state: $state
      search: $search
      skip: $skip
      limit: $limit
      field: $field
      direction: $direction
    ) {
      offers {
        id
        num
        name
        extra_file
        city
        salary_type
        competences {
          id
          name
        }
        entreprise {
          id
          name
          profile_pic_url
        }
        application_number
        state
        contract
        dureeContract
        expiredAt
        createdAt
      }
      totalCount
    }
  }
`;

export const GET_OFFERS_BY_STATUS_BY_ENTREPRISE = gql`
  query getOffersByStateByEntreprise(
    $num: Int
    $state: String
    $search: String
    $skip: Int
    $limit: Int
    $field: String
    $direction: Int
  ) {
    getOffersByStateByEntreprise(
      num: $num
      state: $state
      search: $search
      skip: $skip
      limit: $limit
      field: $field
      direction: $direction
    ) {
      offers {
        id
        num
        name
        city
        extra_file
        salary_type
        competences {
          id
          name
        }
        entreprise {
          id
          name
          num
          profile_pic_url
        }
        application_number
        state
        contract
        dureeContract
        expiredAt
        createdAt
      }
      totalCount
    }
  }
`;

export const GET_OFFERS_BY_STATUS = gql`
  query getOffersByState(
    $state: String
    $search: String
    $skip: Int
    $limit: Int
    $field: String
    $direction: Int
    $offreType: String
  ) {
    getOffersByState(
      state: $state
      search: $search
      skip: $skip
      limit: $limit
      field: $field
      direction: $direction
      offreType: $offreType
    ) {
      offers {
        id
        num
        name
        city
        extra_file
        salary_type
        competences {
          id
          name
        }
        entreprise {
          id
          name
          num
          profile_pic_url
        }
        application_number
        all_application_number
        state
        contract
        startEducation
        endEducation
        startApply
        endApply
        typeFormation
        dureeContract
        application_number
        expiredAt
        createdAt
      }
      totalCount
    }
  }
`;

export const GET_OFFERS_BY_STATUS_BY_ADMIN = gql`
  query getOffersByStateByAdmin(
    $state: String
    $search: String
    $skip: Int
    $limit: Int
    $field: String
    $direction: Int
  ) {
    getOffersByStateByAdmin(
      state: $state
      search: $search
      skip: $skip
      limit: $limit
      field: $field
      direction: $direction
    ) {
      offers {
        id
        num
        name
        city
        extra_file
        salary_type
        competences {
          id
          name
        }
        entreprise {
          id
          name
          num
          profile_pic_url
        }
        application_number
        all_application_number
        state
        contract
        startEducation
        endEducation
        startApply
        endApply
        typeFormation
        dureeContract
        application_number
        expiredAt
        createdAt
      }
      totalCount
    }
  }
`;

export const GET_OFFERS_STATUS_COUNT = gql`
  query getOffersByStateCount($offreType: String) {
    getOffersByStateCount(offreType: $offreType) {
      Count
    }
  }
`;

export const GET_ENTREPRISES = gql`
  query getEntreprises(
    $search: String
    $skip: Int
    $limit: Int
    $ent_type: String
  ) {
    getEntreprises(
      search: $search
      skip: $skip
      limit: $limit
      ent_type: $ent_type
    ) {
      entreprises {
        id
        num
        name
        createdAt
        published_offer_number
        name_of_in_charge
        profile_pic_url
        application_email
        profile {
          id
          email
          is_blocked
          is_blocked_by_admin
        }
      }
      totalCount
    }
  }
`;
export const GET_SCHOOLS = gql`
  query getEntreprises($search: String, $skip: Int, $limit: Int) {
    getEntreprises(search: $search, skip: $skip, limit: $limit) {
      entreprises {
        id
        num
        name
        createdAt
        published_offer_number
        name_of_in_charge
        profile_pic_url
        application_email
        profile {
          id
          email
          is_blocked
          is_blocked_by_admin
        }
      }
      totalCount
    }
  }
`;

export const GET_ADMINS = gql`
  query getAdmins($skip: Int, $limit: Int) {
    getAdmins(skip: $skip, limit: $limit) {
      admins {
        id
        num
        last_name
        first_name
        profile_pic_url
        profile {
          id
          email
        }
        createdAt
      }
      totalCount
    }
  }
`;

export const GET_ADMIN = gql`
  query getAdmin($num: Int) {
    getAdmin(num: $num) {
      id
      num
      last_name
      first_name
      profile_pic_url
      profile {
        id
        email
      }
      createdAt
    }
  }
`;

export const GET_OFFERS_STATS = gql`
  query getOffersStatByWeekEnterprise {
    getOffersStatByWeekEnterprise
  }
`;

export const GET_OFFERS_BY_WEEK_STATS = gql`
  query getOffersStatByWeek {
    getOffersStatByWeek
  }
`;

export const GET_APPLICATIONS_BY_WEEK_STATS = gql`
  query getAcceptedApplicationsStatByWeek {
    getAcceptedApplicationsStatByWeek
  }
`;

export const GET_OFFERS_ACTIVE_STATS = gql`
  query getOffersActiveStatEnterprise {
    getOffersActiveStatEnterprise
  }
`;

export const MY_CV_STAT = gql`
  query getMyCVSatat {
    getMyCVSatat
  }
`;

export const SHARED_CV_STAT = gql`
  query getSharedCVStat {
    getSharedCVStat {
      name
      nombre
    }
  }
`;
export const GET_USERS_STATS = gql`
  query getUsersSatat {
    getUsersSatat
  }
`;

export const UPDATE_USERS_STATUS = gql`
  mutation updateUsersStatus($type: String, $status: Boolean) {
    updateUsersStatus(type: $type, status: $status)
  }
`;

export const UPDATE_USER_STATUS = gql`
  mutation updateUserStatus($status: Boolean, $id: ID) {
    updateUserStatus(status: $status, id: $id)
  }
`;

export const GET_APPLICATIONS_STATS = gql`
  query getApplicationsStatByWeekEnterprise {
    getApplicationsStatByWeekEnterprise
  }
`;

export const GET_ADMIN_APPLICATIONS_STATS = gql`
  query getApplicationsStatByWeek {
    getApplicationsStatByWeek
  }
`;

export const GET_ENTREPRISES_LISTE = gql`
  query getEntrepriseAutocomplete($search: String, $status: String) {
    getEntrepriseAutocomplete(search: $search, status: $status) {
      totalCount
      entreprises {
        id
        name
      }
    }
  }
`;

export const GET_ACTUALITIES = gql`
  query getActualite(
    $entreprise_id: String
    $state: String
    $search: String
    $skip: Int
    $limit: Int
    $field: String
    $direction: Int
  ) {
    getActualite(
      entreprise_id: $entreprise_id
      state: $state
      search: $search
      skip: $skip
      limit: $limit
      field: $field
      direction: $direction
    ) {
      ActualiteResult {
        _id
        num
        title
        description
        lien
        startPublication
        endPublication
        ent_type
        eventDate
        createdAt
        visibleToCandidat
        visibleToAdherent
        entreprise {
          name
          id
          ent_type
        }
      }
      totalCount
    }
  }
`;

export const GET_ACTUALITY_BY_NUM = gql`
  query getActualiteByNum($num: Int!) {
    getActualiteByNum(num: $num) {
      _id
      title
      num
      description
      lien
      startPublication
      endPublication
      eventDate
      visibleToCandidat
      visibleToAdherent
      entreprise {
        id
        name
        ent_type
      }
    }
  }
`;
export const GET_OFFER_BY_NUM = gql`
  query getOfferByNum($num: Int!) {
    getOfferByNum(num: $num) {
      id
      num
      name
      job {
        id
        name
      }
      city
      competences {
        id
        name
      }
      jobs {
        id
        name
      }
      softskills {
        id
        name
      }
      entreprise {
        id
        name
        profile_pic_url
        name_of_in_charge
        address
        application_email
      }
      contract
      experience
      etude
      banner
      description_poste
      address
      extra_file
      salary
      salary_type
      work_time
      offreType
      applications {
        id
        state
        num
        experience
        disponibility
        createdAt
        profile
        candidat {
          id
          last_name
          num
          disponibility
          first_name
          jobs
          competences
          note
          contract
          experience
          etude
          profile_pic_url
          address
          cv
          cv_eng
          profile {
            id
            email
          }
        }
        createdAt
      }
      startEducation
      endEducation
      startApply
      endApply
      typeFormation
      endInternship
      startInternship
      application_number
      state
      dureeContract
      createdAt
      expiredAt
    }
  }
`;

export const GET_USERS_AGE_SEXE_STATS = gql`
  query getUserAgeSexeStats {
    getUserAgeSexeStats
  }
`;

export const EXPORT_CANDIDATES = gql`
  mutation exportCandidates {
    exportCandidates
  }
`;
export const EXPORT_ENTREPRISES = gql`
  mutation exportEntreprises {
    exportEntreprises
  }
`;
export const EXPORT_ECOLE = gql`
  mutation exportEcole {
    exportEcole
  }
`;
export const EXPORT_COMPETENCE = gql`
  mutation exportCompetence {
    exportCompetence
  }
`;
export const EXPORT_SOFTSKILL = gql`
  mutation exportSoftskill {
    exportSoftskill
  }
`;
export const EXPORT_JOBS = gql`
  mutation exportJobs {
    exportJobs
  }
`;

export const GET_APPLICATION_STATS_BY_ADHERENT_TYPE = gql`
  query getApplicationsByAdherent {
    getApplicationsByAdherent
  }
`;

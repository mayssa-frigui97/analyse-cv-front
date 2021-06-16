import gql from 'graphql-tag';

const findCols = gql`
  query findCols($equipe: Int, $pole: Int) {
    findCols (equipe: $equipe, pole: $pole){
      id
      nom
      cin
      dateNaiss
      adresse
      tel
      email
      avatar
      nomUtilisateur
      telPro
      emailPro
      role
      permission
      poste
      dateEmb
      salaire
      evaluation
      equipe {
        id
        nom
        pole {
          id
          nom
        }
      }
    }
  }
`;

const findCol = gql`
  query findCol($idCol: Int!) {
    findCol(idCol: $idCol) {
      id
      nom
      cin
      dateNaiss
      adresse
      tel
      email
      avatar
      nomUtilisateur
      telPro
      emailPro
      role
      permission
      poste
      dateEmb
      salaire
      evaluation
      equipe {
        id
        nom
        pole {
          id
          nom
        }
      }
      cv {
        id
        cmptLinkedin
        statutCV
        activiteAssociatives
        certificats
        langues
        experiences
        formations
        projets
        interets
        competences{
        nom
        }
      }
    }
  }
`;

const findPoles = gql`
  query findPoles {
    findPoles {
      id
      nom
      rp{
        id
      }
    }
  }`;

const findEquipes = gql`
  query findEquipes {
    findEquipes {
      id
      nom
      teamleader{
        nom
      }
      pole{
        nom
      }
    }
  }`;

const findEquipesPole = gql`
  query findEquipesPole ($idPoles: [Int!]!){
    findEquipesPole(idPoles: $idPoles) {
      id
      nom
    }
  }`;

const findFilterCols = gql`
  query findFilterCols($selectedPoles: [Int!],$selectedEquipes: [Int!], $selectedComp: [String!],
   $selectedPoste: [String!]) {
    findFilterCols(selectedPoles: $selectedPoles, selectedEquipes: $selectedEquipes
      selectedComp: $selectedComp, selectedPoste: $selectedPoste) {
      id
      nom
      cin
      dateNaiss
      adresse
      tel
      email
      avatar
      nomUtilisateur
      telPro
      emailPro
      role
      permission
      poste
      dateEmb
      salaire
      evaluation
      equipe {
        id
        nom
        pole {
          id
          nom
        }
      }
    }
  }
`;

const findFilterUsers = gql`
  query findFilterUsers($selectedRoles: [UserRole!]) {
    findFilterUsers(selectedRoles: $selectedRoles) {
      id
      nom
      cin
      dateNaiss
      adresse
      tel
      email
      avatar
      nomUtilisateur
      telPro
      emailPro
      role
      permission
      poste
      dateEmb
      salaire
      evaluation
      equipe {
        id
        nom
        pole {
          id
          nom
        }
      }
    }
  }
`;

const findPostes = gql`
query findPostes($equipe: Int, $pole: Int)
{
  findPostes(equipe: $equipe, pole: $pole)
  {
    poste
  }
}`;


const updateCol = gql`
  mutation updateCol($updateColInput: UpdateColInput!, $idCol: Int!)
  {
    updateCol(updateColInput: $updateColInput, idCol: $idCol){
      id
      nom
      cin
      dateNaiss
      adresse
      tel
      email
      avatar
      nomUtilisateur
      telPro
      emailPro
      role
      permission
      poste
      dateEmb
      salaire
      evaluation
    }
  }`;

const login = gql`
  query login($nomUtilisateur: String!, $motDePasse: String!) {
    login(nomUtilisateur: $nomUtilisateur, motDePasse: $motDePasse) {
      access_token
      user {
        id
        nom
        cin
        dateNaiss
        adresse
        tel
        email
        avatar
        nomUtilisateur
        telPro
        emailPro
        role
        permission
        poste
        dateEmb
        salaire
        evaluation
        equipe {
          id
          nom
          pole {
            id
            nom
          }
        }
        cv {
          id
          cmptLinkedin
          statutCV
          activiteAssociatives
          certificats
          langues
          experiences
          formations
          projets
          interets
          competences{
            nom
          }
        }
      }
    }
  }
`;

const removeCol = gql`
  mutation removeCol($idCol: Int!)
  {
    removeCol(idCol: $idCol)
  }`;

const getUserAuth = gql`
  query getUserAuth {
    getUserAuth {
      id
      nom
      cin
      dateNaiss
      adresse
      tel
      email
      avatar
      nomUtilisateur
      telPro
      emailPro
      role
      permission
      poste
      dateEmb
      salaire
      evaluation
      equipe {
        id
        nom
        pole {
          id
          nom
        }
      }
      cv {
          id
          cmptLinkedin
          statutCV
          activiteAssociatives
          certificats
          langues
          experiences
          formations
          projets
          interets
          competences{
            nom
          }
      }
    }
  }
`;

const findRoles = gql`
query findRoles
{
  findRoles
  {
    role
  }
}`;

const findPermissions = gql`
query findPermissions
{
  findPermissions
  {
    permission
  }
}`;

const createCol = gql`
  mutation createCol($createColInput: CreateColInput!)
  {
    createCol(createColInput: $createColInput){
      id
      nom
      cin
      dateNaiss
      adresse
      tel
      email
      avatar
      nomUtilisateur
      telPro
      emailPro
      role
      permission
      poste
      dateEmb
      salaire
      evaluation
    }
  }`;

const searchCol = gql`
  query searchCol($mot: String!) {
    searchCol(mot: $mot) {
      id
      nom
      cin
      dateNaiss
      adresse
      tel
      email
      avatar
      nomUtilisateur
      telPro
      emailPro
      role
      permission
      poste
      dateEmb
      salaire
      evaluation
      equipe {
        id
        nom
        pole {
          id
          nom
        }
      }
      cv {
        id
        cmptLinkedin
        statutCV
        activiteAssociatives
        certificats
        langues
        experiences
        formations
        projets
        interets
        competences {
          nom
        }
      }
    }
  }
`;
const searchEquipe = gql`
  query searchEquipe($equipe: String!, $mot: String!) {
    searchEquipe(mot: $mot, equipe: $equipe) {
      id
      nom
      cin
      dateNaiss
      adresse
      tel
      email
      avatar
      nomUtilisateur
      telPro
      emailPro
      role
      permission
      poste
      dateEmb
      salaire
      evaluation
      equipe {
        id
        nom
        pole {
          id
          nom
        }
      }
      cv {
        id
        cmptLinkedin
        statutCV
        activiteAssociatives
        certificats
        langues
        experiences
        formations
        projets
        interets
        competences {
          nom
        }
      }
    }
  }
`;
const searchPole = gql`
  query searchPole($pole: String!, $mot: String!) {
    searchPole(mot: $mot, pole: $pole) {
      id
      nom
      cin
      dateNaiss
      adresse
      tel
      email
      avatar
      nomUtilisateur
      telPro
      emailPro
      role
      permission
      poste
      dateEmb
      salaire
      evaluation
      equipe {
        id
        nom
        pole {
          id
          nom
        }
      }
      cv {
        id
        cmptLinkedin
        statutCV
        activiteAssociatives
        certificats
        langues
        experiences
        formations
        projets
        interets
        competences {
          nom
        }
      }
    }
  }
`;

const findPole = gql`
query findPole($idPole: Int!)
{
  findPole(idPole: $idPole)
  {
    nom
  }
}`;

const findEquipe = gql`
query findEquipe($idEquipe: Int!)
{
  findEquipe(idEquipe: $idEquipe)
  {
    nom
  }
}`;

export {
  findCols,
  findCol,
  findPoles,
  findEquipes,
  findEquipesPole,
  findFilterCols,
  findFilterUsers,
  findPostes,
  updateCol,
  removeCol,
  login,
  getUserAuth,
  findRoles,
  findPermissions,
  createCol,
  searchCol,
  searchPole,
  searchEquipe,
  findPole,
  findEquipe
}

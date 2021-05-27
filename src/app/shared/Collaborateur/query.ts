import gql from 'graphql-tag';

const findCols = gql`
  query findCols {
    findCols {
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
        competences
        langues
        experiences
        formations
        projets
        interets
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

const findFilterColsRole = gql`
  query findFilterColsRole($selectedRoles: [UserRole!]!) {
    findFilterColsRole(selectedRoles: $selectedRoles) {
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
query findPostes
{
  findPostes
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
  mutation login($nomUtilisateur: String!, $motDePasse: String!) {
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
          competences
          langues
          experiences
          formations
          projets
          interets
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
    }
  }
`;

export {
  findCols,
  findCol,
  findPoles,
  findEquipes,
  findEquipesPole,
  findFilterCols,
  findFilterColsRole,
  findPostes,
  updateCol,
  removeCol,
  login,
  getUserAuth
}

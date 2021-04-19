import gql from 'graphql-tag';

const findCols = gql`
  query findCols {
    findCols {
      id
      nom
      prenom
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
      poste
      dateEmb
      salaire
      evaluation
      cv {
        id
        cmptGithub
        cmptLinkedin
        posteAct
        description
        statutCV
        formations {
          id
          universite
          dateDebut
          dateFin
          specialite
          niveau
          mention
        }
        certificats {
          id
          nom
          dateObtention
          dateExpiration
          niveau
        }
        competences {
          id
          nom
          version
          niveau
        }
        langues {
          id
          nom
          niveau
          certifie
        }
        experiences {
          id
          societe
          poste
          dateDebut
          dateFin
          description
          motCles
        }
        activiteAssociatives {
          id
          dateDebut
          dateFin
          poste
          association
          description
        }
      }
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
      prenom
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
      poste
      dateEmb
      salaire
      evaluation
      cv {
        id
        cmptGithub
        cmptLinkedin
        description
        posteAct
        statutCV
        formations {
          id
          universite
          dateDebut
          dateFin
          specialite
          niveau
          mention
        }
        certificats {
          id
          nom
          dateObtention
          dateExpiration
          niveau
        }
        competences {
          id
          nom
          version
          niveau
        }
        langues {
          id
          nom
          niveau
          certifie
        }
        experiences {
          id
          societe
          poste
          dateDebut
          dateFin
          description
          motCles
        }
        activiteAssociatives {
          id
          dateDebut
          dateFin
          poste
          association
          description
        }
      }
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
   $selectedPoste: [String!], $selectedUniver: [String!], $selectedSpec: [String!], $selectedNiv: [String!]) {
    findFilterCols(selectedPoles: $selectedPoles, selectedEquipes: $selectedEquipes
      selectedComp: $selectedComp, selectedPoste: $selectedPoste, selectedUniver: $selectedUniver,
      selectedSpec: $selectedSpec, selectedNiv: $selectedNiv ) {
      id
      nom
      prenom
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
      prenom
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
          rp {
            id
            nom
            prenom
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
            poste
            dateEmb
            salaire
            evaluation
          }
        }
      }
    }
  }
`;


const updateCol = gql`
  mutation updateCol($updateColInput: UpdateColInput!, $idCol: Int!)
  {
    updateCol(updateColInput: $updateColInput, idCol: $idCol){
      id
      nom
      prenom
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
      poste
      dateEmb
      salaire
      evaluation
    }
  }`;


export {
  findCols,
  findCol,
  findPoles,
  findEquipes,
  findEquipesPole,
  findFilterCols,
  findFilterColsRole,
  updateCol
}

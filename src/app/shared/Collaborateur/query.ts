import gql from 'graphql-tag';

const findCols = gql`
  query findCols {
    findCols {
      id
      nomUtilisateur
      tel
      email
      roles
      poste
      dateEmb
      salaire
      evaluation
      cv {
        id
        cmptGithub
        cmptLinkedin
        poste
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
          organisation
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
        candidat {
          id
          nom
          prenom
          cin
          dateNaiss
          adresse
          tel
          email
          avatar
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
query findCol($idCol: Int!)
{
  findCol(idCol: $idCol)
  {
    id
    nomUtilisateur
    tel
    email
    roles
    poste
    dateEmb
    salaire
    evaluation
    cv{
      id
      cmptGithub
      cmptLinkedin
      description
      poste
      statutCV
      formations{
        id
        universite
        dateDebut
        dateFin
        specialite
        niveau
        mention
      }
      certificats{
        id
        organisation
        dateObtention
        dateExpiration
        niveau
        }
      competences{
        id
        nom
        version
        niveau}
      langues{
        id
        nom
        niveau
        certifie}
      experiences{
        id
        societe
        poste
        dateDebut
        dateFin
        description
        motCles}
        activiteAssociatives
        {
          id
          dateDebut
          dateFin
          poste
          association
          description}
      candidat{
        id
        nom
        prenom
        cin
        dateNaiss
        adresse
        tel
        email
        avatar
      }
    }
    equipe{
      id
      nom
      pole{
        id
        nom}
      }
  }
}`;

const findPoles = gql`
  query findPoles {
    findPoles {
      id
      nom
    }
  }`;

const findEquipes = gql`
  query findEquipes {
    findEquipes {
      id
      nom
    }
  }`;

export {
  findCols,
  findCol,
  findPoles,
  findEquipes
}
